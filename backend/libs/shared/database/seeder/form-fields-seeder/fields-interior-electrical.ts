import { opts } from './fields-basic.js';

/**
 * Interior & Electrical section.
 */
export const INTERIOR_ELECTRICAL_FIELDS = [
    // ── Cluster & Dashboard ──────────────────────────────────────
    {
        type: 'checkbox', label: 'Cluster Panel', fieldKey: 'cluster_panel', isRequired: true, order: 1,
        options: opts(['Good', 'Speedometer Not Working', 'Warning Light', 'Speedometer Damaged', 'Other']),
    },
    { type: 'file', label: 'Cluster Panel Image', fieldKey: 'cluster_panel_image', isRequired: false, order: 2, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    {
        type: 'textfield', label: 'Warning Details', fieldKey: 'warning_details', placeholder: 'Enter warning light details', isRequired: true, order: 3,
        conditions: { dependsOn: 'cluster_panel', operator: 'contains', value: 'warning_light', action: 'show' },
    },
    {
        type: 'checkbox', label: 'Dashboard', fieldKey: 'dashboard', isRequired: true, order: 4,
        options: opts(['Good', 'Faded', 'Broken', 'Rattling sound', 'Scratched', 'AC Vent Grill Broken', 'Other']),
    },
    { type: 'file', label: 'Dashboard Image', fieldKey: 'dashboard_image', isRequired: false, order: 5, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },

    // ── Seats ────────────────────────────────────────────────────
    { type: 'checkbox', label: 'Front Seat', fieldKey: 'front_seat', isRequired: true, order: 6, options: opts(['Good', 'Fabric', 'Leather', 'Fabric Damaged', 'Leather Damaged', 'Dirty', 'Other']) },
    { type: 'checkbox', label: 'Rear Seat', fieldKey: 'rear_seat', isRequired: true, order: 7, options: opts(['Good', 'Fabric', 'Leather', 'Fabric Damaged', 'Leather Damaged', 'Dirty', 'Other']) },

    // ── Roof lining & mirror ─────────────────────────────────────
    { type: 'checkbox', label: 'Roof Lining', fieldKey: 'roof_lining', isRequired: true, order: 8, options: opts(['Good', 'Damaged', 'Cracked', 'Faded']) },
    { type: 'file', label: 'Roof Lining Image', fieldKey: 'roof_lining_image', isRequired: false, order: 9, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'checkbox', label: 'Inside Rear View Mirror', fieldKey: 'inside_rear_view_mirror', isRequired: true, order: 10, options: opts(['Good', 'Damaged', 'Scratched']) },
    { type: 'file', label: 'Inside Rear View Mirror Image', fieldKey: 'inside_rear_view_mirror_image', isRequired: false, order: 11, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },

    // ── Interior views ───────────────────────────────────────────
    { type: 'file', label: 'Interior View from Rear Seat to Dashboard', fieldKey: 'interior_rear_to_dash_image', isRequired: true, order: 12, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'file', label: 'Power Window-Panel Image', fieldKey: 'power_window_panel_image', isRequired: true, order: 13, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },

    // ── Switches & Controls ──────────────────────────────────────
    { type: 'radio', label: 'Push Button (On/Off)', fieldKey: 'push_button', isRequired: false, order: 14, options: opts(['Functioning', 'Not Functioning', 'Not Available']) },
    { type: 'checkbox', label: 'Dashboard Switches', fieldKey: 'dashboard_switches', isRequired: true, order: 15, options: opts(['Good', 'Damaged', 'Other']) },
    {
        type: 'checkbox', label: 'Power Window & Window Lock', fieldKey: 'power_window_lock', isRequired: true, order: 16,
        options: opts([
            'Front RH Power Window Not Working', 'Front RH Power Window Working', 'Front RH Power Window Stuck',
            'Rear RH Power Window Not Working', 'Rear RH Power Window Working', 'Rear RH Power Window Stuck',
            'Front LH Power Window Not Working', 'Front LH Power Window Working', 'Front LH Power Window Stuck',
            'Rear LH Power Window Not Working', 'Rear LH Power Window Working', 'Rear LH Power Window Stuck',
            'Not Available', 'Damaged', 'All Windows Working',
        ]),
    },

    // ── Other interior ──────────────────────────────────────────
    { type: 'checkbox', label: 'Hand Brake', fieldKey: 'hand_brake', isRequired: true, order: 17, options: opts(['Working', 'Not Working', 'Not Satisfactory', 'Other']) },
    { type: 'checkbox', label: 'Car Electrical', fieldKey: 'car_electrical', isRequired: true, order: 18, options: opts(['Good', 'ECM Malfunction', 'Fuel Pump Not Working', 'Wiring Damaged', 'Rat Damage', 'Other']) },
    { type: 'file', label: 'Car Electrical Image', fieldKey: 'car_electrical_image', isRequired: false, order: 19, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'file', label: 'CNG/LPG Kit Image', fieldKey: 'cng_lpg_kit_image', isRequired: false, order: 20, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'Second Key', fieldKey: 'second_key', isRequired: true, order: 21, options: opts(['Damaged', 'Not Available', 'Good']) },
    { type: 'checkbox', label: 'Platform', fieldKey: 'platform', isRequired: false, order: 22, options: opts(['Good', 'Rusted', 'Damaged', 'Replaced', 'Welded', 'Repainted', 'Other']) },
    { type: 'file', label: 'Platform Image', fieldKey: 'platform_image', isRequired: false, order: 23, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
];
