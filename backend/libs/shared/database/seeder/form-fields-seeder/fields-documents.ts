import { opts } from './fields-basic';

/**
 * Documents section – RC images, insurance, hypothecation, NOC, etc.
 */
export const DOCUMENTS_FIELDS = [
    // ── RC Images ────────────────────────────────────────────────
    { type: 'file', label: 'RC Front Image', fieldKey: 'rc_front_image', placeholder: 'Upload the front image of the RC', isRequired: true, order: 1, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'file', label: 'RC Back Image', fieldKey: 'rc_back_image', placeholder: 'Upload the back image of the RC', isRequired: true, order: 2, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },

    // ── Transfer & Insurance ─────────────────────────────────────
    { type: 'radio', label: 'Inter State Transfer', fieldKey: 'inter_state_transfer', isRequired: true, order: 3, options: opts(['Yes', 'No']) },
    { type: 'radio', label: 'Insurance', fieldKey: 'insurance_type', isRequired: true, order: 4, options: opts(['Comprehensive', 'Third Party', 'Zero Depreciation', 'Expired']) },
    {
        type: 'datepicker', label: 'Insurance Validity', fieldKey: 'insurance_validity', isRequired: true, order: 5,
        conditions: {
            logic: 'OR', action: 'show', rules: [
                { dependsOn: 'insurance_type', operator: 'equals', value: 'comprehensive' },
                { dependsOn: 'insurance_type', operator: 'equals', value: 'third_party' },
                { dependsOn: 'insurance_type', operator: 'equals', value: 'zero_depreciation' },
            ]
        },
    },
    { type: 'textfield', label: 'Insurance Company', fieldKey: 'insurance_company', placeholder: 'Enter insurance provider name', isRequired: false, order: 6 },
    { type: 'number', label: 'Insurance IDV (Insured Declared Value)', fieldKey: 'insurance_idv', placeholder: 'Enter IDV amount', isRequired: false, order: 7, validation: { min: 0 } },
    { type: 'file', label: 'Insurance Image', fieldKey: 'insurance_image', isRequired: true, order: 8, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf'], maxFileSize: 10485760 } },

    // ── NCB ──────────────────────────────────────────────────────
    { type: 'radio', label: 'NCB (No Claim Bonus)', fieldKey: 'ncb', isRequired: false, order: 9, options: opts(['Yes', 'No']) },
    { type: 'number', label: 'NCB Percentage', fieldKey: 'ncb_percentage', placeholder: 'Enter NCB percentage', isRequired: true, order: 10, validation: { min: 0, max: 100 }, conditions: { dependsOn: 'ncb', operator: 'equals', value: 'yes', action: 'show' } },

    // ── Hypothecation ────────────────────────────────────────────
    { type: 'radio', label: 'Under Hypothecation', fieldKey: 'under_hypothecation', isRequired: true, order: 11, options: opts(['Yes', 'No']) },
    { type: 'textfield', label: 'Bank Name', fieldKey: 'hypothecation_bank_name', placeholder: 'Enter bank name', isRequired: true, order: 12, conditions: { dependsOn: 'under_hypothecation', operator: 'equals', value: 'yes', action: 'show' } },
    { type: 'radio', label: 'Loan Status', fieldKey: 'loan_status', isRequired: true, order: 13, options: opts(['Closed', 'Open']), conditions: { dependsOn: 'under_hypothecation', operator: 'equals', value: 'yes', action: 'show' } },

    // ── NOC ──────────────────────────────────────────────────────
    { type: 'radio', label: 'Loan NOC (No Objection Certificate)', fieldKey: 'loan_noc', isRequired: true, order: 14, options: opts(['Yes', 'No']), conditions: { dependsOn: 'under_hypothecation', operator: 'equals', value: 'yes', action: 'show' } },
    { type: 'file', label: 'NOC Image', fieldKey: 'loan_noc_image', placeholder: 'Upload the NOC image', isRequired: true, order: 15, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf'], maxFileSize: 10485760 }, conditions: { dependsOn: 'loan_noc', operator: 'equals', value: 'yes', action: 'show' } },

    // ── Form 35 ──────────────────────────────────────────────────
    { type: 'radio', label: 'Form 35', fieldKey: 'form_35', isRequired: false, order: 16, options: opts(['Yes', 'No']) },
    { type: 'file', label: 'Form 35 Image', fieldKey: 'form_35_image', placeholder: 'Upload the Form 35 image', isRequired: true, order: 17, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf'], maxFileSize: 10485760 }, conditions: { dependsOn: 'form_35', operator: 'equals', value: 'yes', action: 'show' } },

    // ── Chassis & Mismatch ───────────────────────────────────────
    { type: 'file', label: 'Chassis Impression Image', fieldKey: 'chassis_impression_image', placeholder: 'Upload the image of the chassis impression', isRequired: false, order: 18, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'RC Mismatch', fieldKey: 'rc_mismatch', isRequired: true, order: 19, options: opts(['Yes', 'No']) },
    { type: 'textfield', label: 'RC Mismatch Remarks', fieldKey: 'rc_mismatch_remarks', placeholder: 'Describe the mismatch details', isRequired: true, order: 20, conditions: { dependsOn: 'rc_mismatch', operator: 'equals', value: 'yes', action: 'show' } },

    // ── Document remarks (multi-select) ──────────────────────────
    {
        type: 'checkbox', label: 'Remarks', fieldKey: 'document_remarks', isRequired: false, order: 21,
        options: opts(['Migrated from another state', 'Road tax limited period', 'Insurance not available', 'Road Tax Expired', 'Fitness Expired', 'Not Registered', 'RC Lost', 'RC Duplicate', 'RC PhotoCopy']),
    },

    // ── RTO NOC & Insurance Mismatch ─────────────────────────────
    { type: 'radio', label: 'RTO NOC Issued', fieldKey: 'rto_noc_issued', isRequired: false, order: 22, options: opts(['Yes', 'No']) },
    { type: 'radio', label: 'Insurance Mismatch', fieldKey: 'insurance_mismatch', isRequired: false, order: 23, options: opts(['Yes', 'No']) },
];
