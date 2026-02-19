import { PrismaClient } from '@prisma/client';

export class FormConfigSeeder {
    static async seed(prisma: PrismaClient) {
        // ─── EVALUATION Type ────────────────────────────────────────────────

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

        // EVALUATION Step 1: Vehicle Details
        let evalStep1 = await prisma.documentGroup.findFirst({
            where: { identifier: 'EVAL_VEHICLE_DETAILS', parentId: evaluationType.id },
        });

        if (!evalStep1) {
            evalStep1 = await prisma.documentGroup.create({
                data: {
                    name: 'Vehicle Details',
                    identifier: 'EVAL_VEHICLE_DETAILS',
                    description: 'Basic vehicle information',
                    type: 'FORM_STEP',
                    parentId: evaluationType.id,
                    groupName: 'EVALUATION',
                    order: 1,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created step: EVALUATION > Vehicle Details');
        }

        // EVALUATION Step 2: Condition Assessment
        let evalStep2 = await prisma.documentGroup.findFirst({
            where: { identifier: 'EVAL_CONDITION', parentId: evaluationType.id },
        });

        if (!evalStep2) {
            evalStep2 = await prisma.documentGroup.create({
                data: {
                    name: 'Condition Assessment',
                    identifier: 'EVAL_CONDITION',
                    description: 'Vehicle condition evaluation',
                    type: 'FORM_STEP',
                    parentId: evaluationType.id,
                    groupName: 'EVALUATION',
                    order: 2,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created step: EVALUATION > Condition Assessment');
        }

        // EVALUATION Step 3: Documents & Photos
        let evalStep3 = await prisma.documentGroup.findFirst({
            where: { identifier: 'EVAL_DOCUMENTS', parentId: evaluationType.id },
        });

        if (!evalStep3) {
            evalStep3 = await prisma.documentGroup.create({
                data: {
                    name: 'Documents & Photos',
                    identifier: 'EVAL_DOCUMENTS',
                    description: 'Upload vehicle documents and photos',
                    type: 'FORM_STEP',
                    parentId: evaluationType.id,
                    groupName: 'EVALUATION',
                    order: 3,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created step: EVALUATION > Documents & Photos');
        }

        // ─── FINANCE Type ───────────────────────────────────────────────────

        let financeType = await prisma.documentGroup.findFirst({
            where: { identifier: 'FINANCE', parentId: null },
        });

        if (!financeType) {
            financeType = await prisma.documentGroup.create({
                data: {
                    name: 'Finance',
                    identifier: 'FINANCE',
                    description: 'Vehicle finance application form',
                    type: 'FORM_TYPE',
                    order: 2,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created form type: FINANCE');
        } else {
            console.log('  ⊗ Form type already exists: FINANCE');
        }

        // FINANCE Step 1: Applicant Details
        let finStep1 = await prisma.documentGroup.findFirst({
            where: { identifier: 'FIN_APPLICANT', parentId: financeType.id },
        });

        if (!finStep1) {
            finStep1 = await prisma.documentGroup.create({
                data: {
                    name: 'Applicant Details',
                    identifier: 'FIN_APPLICANT',
                    description: 'Applicant personal information',
                    type: 'FORM_STEP',
                    parentId: financeType.id,
                    groupName: 'FINANCE',
                    order: 1,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created step: FINANCE > Applicant Details');
        }

        // FINANCE Step 2: Loan Details
        let finStep2 = await prisma.documentGroup.findFirst({
            where: { identifier: 'FIN_LOAN', parentId: financeType.id },
        });

        if (!finStep2) {
            finStep2 = await prisma.documentGroup.create({
                data: {
                    name: 'Loan Details',
                    identifier: 'FIN_LOAN',
                    description: 'Loan amount and terms',
                    type: 'FORM_STEP',
                    parentId: financeType.id,
                    groupName: 'FINANCE',
                    order: 2,
                    isEnabled: true,
                },
            });
            console.log('  ✓ Created step: FINANCE > Loan Details');
        }

        // ─── Sample Fields for EVALUATION Step 1 ────────────────────────────

        const evalStep1Fields = [
            {
                type: 'textfield',
                label: 'Vehicle Name',
                fieldKey: 'vehicle_name',
                placeholder: 'Enter vehicle name',
                isRequired: true,
                order: 1,
                validation: { minLength: 2, maxLength: 100 },
            },
            {
                type: 'textfield',
                label: 'Vehicle Number',
                fieldKey: 'vehicle_number',
                placeholder: 'Enter registration number',
                isRequired: true,
                order: 2,
                validation: { minLength: 2, maxLength: 20 },
            },
            {
                type: 'select',
                label: 'Vehicle Type',
                fieldKey: 'vehicle_type',
                isRequired: true,
                order: 3,
                options: [
                    { label: 'Car', value: 'car' },
                    { label: 'Truck', value: 'truck' },
                    { label: 'Bike', value: 'bike' },
                    { label: 'SUV', value: 'suv' },
                ],
            },
            {
                type: 'select',
                label: 'Vehicle Model',
                fieldKey: 'vehicle_model',
                isRequired: true,
                order: 4,
                endpoint: '/api/options/vehicle-models',
            },
            {
                type: 'number',
                label: 'Year of Manufacture',
                fieldKey: 'year_of_manufacture',
                placeholder: 'e.g., 2023',
                isRequired: true,
                order: 5,
                validation: { min: 1900, max: 2030 },
            },
            {
                type: 'number',
                label: 'Tonnage Capacity',
                fieldKey: 'tonnage_capacity',
                placeholder: 'Enter tonnage',
                isRequired: true,
                order: 6,
                validation: { min: 1, max: 50 },
                conditions: {
                    dependsOn: 'vehicle_type',
                    operator: 'equals',
                    value: 'truck',
                    action: 'show',
                },
            },
            {
                type: 'select',
                label: 'Engine CC',
                fieldKey: 'engine_cc',
                isRequired: false,
                order: 7,
                options: [
                    { label: '100cc', value: '100' },
                    { label: '150cc', value: '150' },
                    { label: '200cc', value: '200' },
                    { label: '250cc', value: '250' },
                ],
                conditions: {
                    dependsOn: 'vehicle_type',
                    operator: 'equals',
                    value: 'bike',
                    action: 'show',
                },
            },
        ];

        for (const field of evalStep1Fields) {
            const existing = await prisma.formField.findFirst({
                where: {
                    documentGroupId: evalStep1!.id,
                    fieldKey: field.fieldKey,
                },
            });

            if (!existing) {
                await prisma.formField.create({
                    data: {
                        documentGroupId: evalStep1!.id,
                        type: field.type,
                        label: field.label,
                        fieldKey: field.fieldKey,
                        placeholder: field.placeholder || null,
                        isRequired: field.isRequired,
                        order: field.order,
                        validation: field.validation,
                        options: field.options,
                        endpoint: field.endpoint || null,
                        conditions: field.conditions,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created field: ${field.label} (${field.fieldKey})`);
            }
        }

        // ─── Sample Fields for EVALUATION Step 2 ────────────────────────────

        const evalStep2Fields = [
            {
                type: 'select',
                label: 'Exterior Condition',
                fieldKey: 'exterior_condition',
                isRequired: true,
                order: 1,
                options: [
                    { label: 'Excellent', value: 'excellent' },
                    { label: 'Good', value: 'good' },
                    { label: 'Fair', value: 'fair' },
                    { label: 'Poor', value: 'poor' },
                ],
            },
            {
                type: 'select',
                label: 'Interior Condition',
                fieldKey: 'interior_condition',
                isRequired: true,
                order: 2,
                options: [
                    { label: 'Excellent', value: 'excellent' },
                    { label: 'Good', value: 'good' },
                    { label: 'Fair', value: 'fair' },
                    { label: 'Poor', value: 'poor' },
                ],
            },
            {
                type: 'number',
                label: 'Odometer Reading (km)',
                fieldKey: 'odometer_reading',
                placeholder: 'Enter current reading',
                isRequired: true,
                order: 3,
                validation: { min: 0, max: 999999 },
            },
            {
                type: 'textarea',
                label: 'Additional Notes',
                fieldKey: 'additional_notes',
                placeholder: 'Any additional observations...',
                isRequired: false,
                order: 4,
                validation: { maxLength: 1000 },
            },
        ];

        for (const field of evalStep2Fields) {
            const existing = await prisma.formField.findFirst({
                where: {
                    documentGroupId: evalStep2!.id,
                    fieldKey: field.fieldKey,
                },
            });

            if (!existing) {
                await prisma.formField.create({
                    data: {
                        documentGroupId: evalStep2!.id,
                        type: field.type,
                        label: field.label,
                        fieldKey: field.fieldKey,
                        placeholder: field.placeholder || null,
                        isRequired: field.isRequired,
                        order: field.order,
                        validation: field.validation,
                        options: field.options,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created field: ${field.label} (${field.fieldKey})`);
            }
        }

        // ─── Sample Fields for EVALUATION Step 3 ────────────────────────────

        const evalStep3Fields = [
            {
                type: 'upload',
                label: 'Registration Certificate',
                fieldKey: 'registration_certificate',
                isRequired: true,
                order: 1,
                validation: { allowedFileTypes: ['.pdf', '.jpg', '.png'], maxFileSize: 5242880 },
            },
            {
                type: 'upload',
                label: 'Insurance Document',
                fieldKey: 'insurance_document',
                isRequired: true,
                order: 2,
                validation: { allowedFileTypes: ['.pdf', '.jpg', '.png'], maxFileSize: 5242880 },
            },
            {
                type: 'upload',
                label: 'Vehicle Photos',
                fieldKey: 'vehicle_photos',
                isRequired: false,
                order: 3,
                validation: { allowedFileTypes: ['.jpg', '.png', '.jpeg'], maxFileSize: 10485760 },
            },
        ];

        for (const field of evalStep3Fields) {
            const existing = await prisma.formField.findFirst({
                where: {
                    documentGroupId: evalStep3!.id,
                    fieldKey: field.fieldKey,
                },
            });

            if (!existing) {
                await prisma.formField.create({
                    data: {
                        documentGroupId: evalStep3!.id,
                        type: field.type,
                        label: field.label,
                        fieldKey: field.fieldKey,
                        isRequired: field.isRequired,
                        order: field.order,
                        validation: field.validation,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created field: ${field.label} (${field.fieldKey})`);
            }
        }

        // ─── Sample Fields for FINANCE Step 1 ───────────────────────────────

        const finStep1Fields = [
            {
                type: 'textfield',
                label: 'Applicant Full Name',
                fieldKey: 'applicant_name',
                placeholder: 'Enter full name',
                isRequired: true,
                order: 1,
                validation: { minLength: 2, maxLength: 100 },
            },
            {
                type: 'email',
                label: 'Email Address',
                fieldKey: 'applicant_email',
                placeholder: 'Enter email',
                isRequired: true,
                order: 2,
            },
            {
                type: 'phone',
                label: 'Phone Number',
                fieldKey: 'applicant_phone',
                placeholder: 'Enter phone number',
                isRequired: true,
                order: 3,
            },
            {
                type: 'select',
                label: 'Employment Type',
                fieldKey: 'employment_type',
                isRequired: true,
                order: 4,
                options: [
                    { label: 'Salaried', value: 'salaried' },
                    { label: 'Self-employed', value: 'self_employed' },
                    { label: 'Business Owner', value: 'business_owner' },
                ],
            },
            {
                type: 'number',
                label: 'Monthly Income',
                fieldKey: 'monthly_income',
                placeholder: 'Enter monthly income',
                isRequired: true,
                order: 5,
                validation: { min: 0 },
                conditions: {
                    dependsOn: 'employment_type',
                    operator: 'not_empty',
                    action: 'show',
                },
            },
        ];

        for (const field of finStep1Fields) {
            const existing = await prisma.formField.findFirst({
                where: {
                    documentGroupId: finStep1!.id,
                    fieldKey: field.fieldKey,
                },
            });

            if (!existing) {
                await prisma.formField.create({
                    data: {
                        documentGroupId: finStep1!.id,
                        type: field.type,
                        label: field.label,
                        fieldKey: field.fieldKey,
                        placeholder: field.placeholder || null,
                        isRequired: field.isRequired,
                        order: field.order,
                        validation: field.validation,
                        options: field.options,
                        conditions: field.conditions,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created field: ${field.label} (${field.fieldKey})`);
            }
        }

        // ─── Sample Fields for FINANCE Step 2 ───────────────────────────────

        const finStep2Fields = [
            {
                type: 'number',
                label: 'Loan Amount',
                fieldKey: 'loan_amount',
                placeholder: 'Enter desired loan amount',
                isRequired: true,
                order: 1,
                validation: { min: 10000 },
            },
            {
                type: 'select',
                label: 'Loan Tenure',
                fieldKey: 'loan_tenure',
                isRequired: true,
                order: 2,
                options: [
                    { label: '12 months', value: '12' },
                    { label: '24 months', value: '24' },
                    { label: '36 months', value: '36' },
                    { label: '48 months', value: '48' },
                    { label: '60 months', value: '60' },
                ],
            },
            {
                type: 'radio',
                label: 'Down Payment Option',
                fieldKey: 'down_payment_option',
                isRequired: true,
                order: 3,
                options: [
                    { label: '10%', value: '10' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                    { label: 'Custom', value: 'custom' },
                ],
            },
            {
                type: 'number',
                label: 'Custom Down Payment Amount',
                fieldKey: 'custom_down_payment',
                placeholder: 'Enter amount',
                isRequired: true,
                order: 4,
                validation: { min: 0 },
                conditions: {
                    dependsOn: 'down_payment_option',
                    operator: 'equals',
                    value: 'custom',
                    action: 'show',
                },
            },
            {
                type: 'checkbox',
                label: 'I agree to the terms and conditions',
                fieldKey: 'terms_agreed',
                isRequired: true,
                order: 5,
            },
        ];

        for (const field of finStep2Fields) {
            const existing = await prisma.formField.findFirst({
                where: {
                    documentGroupId: finStep2!.id,
                    fieldKey: field.fieldKey,
                },
            });

            if (!existing) {
                await prisma.formField.create({
                    data: {
                        documentGroupId: finStep2!.id,
                        type: field.type,
                        label: field.label,
                        fieldKey: field.fieldKey,
                        placeholder: field.placeholder || null,
                        isRequired: field.isRequired,
                        order: field.order,
                        validation: field.validation,
                        options: field.options,
                        conditions: field.conditions,
                        isEnabled: true,
                    },
                });
                console.log(`  ✓ Created field: ${field.label} (${field.fieldKey})`);
            }
        }

        console.log('  ✅ Form configuration seeding complete');
    }
}
