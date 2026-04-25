import { PrismaClient } from '@prisma/client';
import {
    DOCUMENT_GROUPS,
    BASIC_FIELDS,
    DOCUMENTS_FIELDS,
    EXTERIOR_FIELDS,
    ENGINE_FIELDS,
    INTERIOR_ELECTRICAL_FIELDS,
    TEST_DRIVE_FIELDS,
    FEATURES_FIELDS,
    AIR_CONDITIONING_FIELDS,
    SPECIAL_COMMENTS_FIELDS,
    MANUAL_RATINGS_FIELDS,
    FIELD_SUBGROUPS,
} from './form-fields-seeder';

/**
 * Map each group identifier to its field array.
 */
const GROUP_FIELD_MAP: Record<string, any[]> = {
    basic: BASIC_FIELDS,
    documents: DOCUMENTS_FIELDS,
    exterior: EXTERIOR_FIELDS,
    engine: ENGINE_FIELDS,
    interior_electrical: INTERIOR_ELECTRICAL_FIELDS,
    test_drive: TEST_DRIVE_FIELDS,
    features: FEATURES_FIELDS,
    air_conditioning: AIR_CONDITIONING_FIELDS,
    special_comments: SPECIAL_COMMENTS_FIELDS,
    manual_ratings: MANUAL_RATINGS_FIELDS,
};

export class FormConfigSeeder {
    /**
     * Seed all document groups and their form fields for
     * the used-car evaluation workflow.
     *
     * Uses upsert-style logic: skip if already exists (matched by identifier / fieldKey).
     */
    static async seed(prisma: PrismaClient) {
        // ─── 1. Create the top-level EVALUATION type group ─────────
        let evaluationType = await prisma.documentGroup.findFirst({
            where: { identifier: 'EVALUATION', parentId: null },
        });

        if (!evaluationType) {
            evaluationType = await prisma.documentGroup.create({
                data: {
                    name: 'Evaluation',
                    identifier: 'EVALUATION',
                    description: 'Vehicle evaluation form',
                    type: 'FORM_TYPE',
                    order: 1,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created form type: EVALUATION');
        } else {
            console.log('  ⊗ Form type already exists: EVALUATION');
        }

        // ─── 2. Create each document group as a child of EVALUATION ─
        const groupIdMap: Record<string, string> = {};

        for (const groupDef of DOCUMENT_GROUPS) {
            let group = await prisma.documentGroup.findFirst({
                where: { identifier: groupDef.identifier, parentId: evaluationType.id },
            });

            if (!group) {
                group = await prisma.documentGroup.create({
                    data: {
                        name: groupDef.name,
                        identifier: groupDef.identifier,
                        description: groupDef.description,
                        type: groupDef.type,
                        parentId: evaluationType.id,
                        groupName: 'EVALUATION',
                        order: groupDef.order,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created group: ${groupDef.name}`);
            } else {
                await prisma.documentGroup.update({
                    where: { id: group.id },
                    data: {
                        name: groupDef.name,
                        description: groupDef.description,
                        type: groupDef.type,
                        groupName: 'EVALUATION',
                        order: groupDef.order,
                        isEnabled: true,
                    },
                });
                console.log(`  ⊗ Group already exists: ${groupDef.name}`);
            }

            groupIdMap[groupDef.identifier] = group.id;
        }

        // ─── 3. Seed form fields for each group ─────────────────────
        let totalCreated = 0;
        let totalSkipped = 0;

        for (const [identifier, fields] of Object.entries(GROUP_FIELD_MAP)) {
            const groupId = groupIdMap[identifier];
            if (!groupId) {
                console.warn(`  ⚠ No group found for identifier: ${identifier}`);
                continue;
            }

            // Normalise order values (some exteriors use .5 for companion images)
            const sorted = [...fields].sort((a: any, b: any) => a.order - b.order);
            for (let i = 0; i < sorted.length; i++) {
                sorted[i] = { ...sorted[i], order: i + 1 };
            }

            for (const field of sorted) {
                const subgroup = field.subgroup ?? FIELD_SUBGROUPS[identifier]?.[field.fieldKey] ?? null;
                const existing = await prisma.formField.findFirst({
                    where: { documentGroupId: groupId, fieldKey: field.fieldKey },
                });

                if (!existing) {
                    await prisma.formField.create({
                        data: {
                            documentGroupId: groupId,
                            type: field.type,
                            label: field.label,
                            fieldKey: field.fieldKey,
                            placeholder: field.placeholder ?? null,
                            defaultValue: field.defaultValue ?? null,
                            isRequired: field.isRequired ?? false,
                            order: field.order,
                            validation: field.validation ?? undefined,
                            options: field.options ?? undefined,
                            endpoint: field.endpoint ?? null,
                            conditions: field.conditions ?? undefined,
                            subgroup,
                            isEnabled: true,
                        },
                    });
                    totalCreated++;
                } else {
                    // Update existing field with latest values from seeder
                    await prisma.formField.update({
                        where: { id: existing.id },
                        data: {
                            type: field.type,
                            label: field.label,
                            placeholder: field.placeholder ?? null,
                            defaultValue: field.defaultValue ?? null,
                            isRequired: field.isRequired ?? false,
                            order: field.order,
                            validation: field.validation ?? undefined,
                            options: field.options ?? undefined,
                            endpoint: field.endpoint ?? null,
                            conditions: field.conditions ?? undefined,
                            subgroup,
                        },
                    });
                    totalSkipped++;
                }
            }

            console.log(`  ✓ ${identifier}: seeded fields`);
        }

        console.log(
            `  ✅ Form configuration complete – ${totalCreated} fields created, ${totalSkipped} skipped (already exist)`,
        );
    }
}
