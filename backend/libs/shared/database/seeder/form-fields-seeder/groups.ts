/**
 * Document group definitions for the used-car evaluation form.
 * Each group represents a major section/step in the evaluation workflow.
 */
export const DOCUMENT_GROUPS = [
    {
        name: 'Basic',
        identifier: 'basic',
        description: 'Basic vehicle and seller information',
        type: 'FORM_STEP',
        order: 1,
    },
    {
        name: 'Documents',
        identifier: 'documents',
        description: 'Vehicle documents, RC, insurance, and hypothecation details',
        type: 'FORM_STEP',
        order: 2,
    },
    {
        name: 'Exterior',
        identifier: 'exterior',
        description: 'Exterior body parts condition and images',
        type: 'FORM_STEP',
        order: 3,
    },
    {
        name: 'Engine',
        identifier: 'engine',
        description: 'Engine compartment, components, and mechanical inspection',
        type: 'FORM_STEP',
        order: 4,
    },
    {
        name: 'Interior & Electrical',
        identifier: 'interior_electrical',
        description: 'Interior condition, dashboard, electrical systems',
        type: 'FORM_STEP',
        order: 5,
    },
    {
        name: 'Test Drive',
        identifier: 'test_drive',
        description: 'Steering, suspension, brakes, and drive assessment',
        type: 'FORM_STEP',
        order: 6,
    },
    {
        name: 'Features',
        identifier: 'features',
        description: 'Vehicle features, safety, and accessories',
        type: 'FORM_STEP',
        order: 7,
    },
    {
        name: 'Air Conditioning',
        identifier: 'air_conditioning',
        description: 'AC system inspection',
        type: 'FORM_STEP',
        order: 8,
    },
    {
        name: 'Special Comments',
        identifier: 'special_comments',
        description: 'Major issues and special observations',
        type: 'FORM_STEP',
        order: 9,
    },
    {
        name: 'Manual Ratings',
        identifier: 'manual_ratings',
        description: 'Manual rating scores, voice notes, and selfie',
        type: 'FORM_STEP',
        order: 10,
    },
] as const;
