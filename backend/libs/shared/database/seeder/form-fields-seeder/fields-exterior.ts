import { opts } from './fields-basic.js';

// ── Re-usable condition-option sets ──────────────────────────────────────
const BODY_CONDITIONS = ['Good', 'Scratched', 'Dented', 'Damaged', 'Repaired', 'Replaced', 'Rusted', 'Repainted', 'Other'];
const PILLAR_CONDITIONS = ['Good', 'Replaced', 'Repainted', 'Rusted', 'Scratched', 'Dented', 'Faded', 'Damaged', 'Colour Mismatch', 'Welded', 'Other'];
const GLASS_CONDITIONS = ['Good', 'Scratched', 'Damaged', 'Replaced', 'Repainted', 'Cracked', 'Chipped', 'Other'];
const DOOR_CONDITIONS = ['Good', 'Replaced', 'Repainted', 'Rusted', 'Scratched', 'Dented', 'Faded', 'Damaged', 'Colour Mismatch', 'Other'];
const HEADLIGHT_CONDITIONS = ['Good', 'Scratched', 'Damaged', 'Replaced', 'Faded', 'Foggy', 'Non-Functional', 'Other'];
const TAIL_LIGHT_CONDITIONS = ['Good', 'Scratched', 'Damaged', 'Faded', 'Foggy', 'Non-Functional', 'Other'];
const MIRROR_CONDITIONS = ['Good', 'Scratched', 'Damaged', 'Repaired', 'Missing', 'Non-Functional', 'Folding Motor Not Working', 'Other'];
const TYRE_CONDITIONS = ['0-25%', '25-50%', '50-75%', '75%-100%', 'Damaged'];
const CROSS_MEMBER_CONDS = ['Good', 'Damaged', 'Repaired', 'Replaced', 'Rusted', 'Repainted', 'Welded', 'Other'];
const APRON_CONDITIONS = ['Good', 'Replaced', 'Repaired', 'Damaged', 'Rusted', 'Repainted', 'Other'];

/** checkbox + image field for an exterior part */
const extPart = (label: string, fieldKey: string, order: number, conditions: string[], required = true, singleSelect = false) => [
    {
        type: singleSelect ? 'radio' : 'checkbox',
        label,
        fieldKey,
        isRequired: required,
        order,
        options: opts(conditions),
        // Frontend enforces: if 'Good'/'Working' selected, clear others
    },
    {
        type: 'file', label: `${label} Image`, fieldKey: `${fieldKey}_image`,
        isRequired: required, order: order + 0.5,
        validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760, maxFiles: 4, minFiles: 1 },
    },
];

/** Image-only field */
const imgField = (label: string, fieldKey: string, order: number, required = true) => ({
    type: 'file', label, fieldKey, isRequired: required, order,
    validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760, maxFiles: 4, minFiles: 1 },
});

/**
 * Exterior section – body parts with condition checkboxes + image uploads.
 * Order values use integers; the .5 values for companion images will be rounded
 * in the seeder when inserting.
 */
export const EXTERIOR_FIELDS = [
    // ── Front ────────────────────────────────────────────────────
    imgField('Front Image', 'front_image', 1),
    ...extPart('Bonnet', 'bonnet', 2, BODY_CONDITIONS),
    ...extPart('Bonnet Patti', 'bonnet_patti', 4, BODY_CONDITIONS),
    ...extPart('Headlight Support', 'headlight_support', 6, ['Good', 'Welded', 'Clamped', 'Damaged', 'Repaired', 'Other'], false),
    ...extPart('Front Windshield', 'front_windshield', 8, ['Good', 'Scratched', 'Damaged', 'Rusted', 'Replaced', 'Spots', 'Chipped', 'Other']),
    ...extPart('Roof', 'roof', 10, ['Good', 'Scratched', 'Welded', 'Replaced', 'Dented', 'Damaged', 'Repaired', 'Faded', 'Rusted', 'Repainted', 'Cracked', 'Other']),
    ...extPart('Front Bumper', 'front_bumper', 12, BODY_CONDITIONS),
    ...extPart('Front Grill', 'front_grill', 14, ['Good', 'Damaged', 'Other'], false),
    ...extPart('Headlights - RH', 'headlights_rh', 16, HEADLIGHT_CONDITIONS),
    ...extPart('Headlights - LH', 'headlights_lh', 18, HEADLIGHT_CONDITIONS),
    ...extPart('Fog Lamp', 'fog_lamp', 20, ['Working', 'Not Working', 'Not Available', 'Damaged'], false),

    // ── Front Right ──────────────────────────────────────────────
    imgField('Front Right Image', 'front_right_image', 22),
    ...extPart('RH-Fender', 'rh_fender', 23, ['Good', 'Replaced', 'Repainted', 'Rusted', 'Scratched', 'Dented', 'Faded', 'Damaged', 'Colour Mismatch', 'Other']),
    ...extPart('RH-A Pillar', 'rh_a_pillar', 25, PILLAR_CONDITIONS),
    { type: 'radio', label: 'Tyre Front RHS', fieldKey: 'tyre_front_rhs', isRequired: true, order: 27, options: opts(TYRE_CONDITIONS) },
    ...extPart('Front RH Door', 'front_rh_door', 28, DOOR_CONDITIONS),
    ...extPart('Front Door Glass RH', 'front_door_glass_rh', 30, GLASS_CONDITIONS),

    // ── Right ────────────────────────────────────────────────────
    imgField('Right Image', 'right_image', 32),
    ...extPart('RH-B Pillar', 'rh_b_pillar', 33, PILLAR_CONDITIONS),
    ...extPart('RH Running Board', 'rh_running_board', 35, PILLAR_CONDITIONS),
    ...extPart('Rear RH Door', 'rear_rh_door', 37, DOOR_CONDITIONS),
    ...extPart('Rear Door Glass RH', 'rear_door_glass_rh', 39, GLASS_CONDITIONS),
    ...extPart('RH C Pillar', 'rh_c_pillar', 41, PILLAR_CONDITIONS),
    ...extPart('RH-Quarter Panel', 'rh_quarter_panel', 43, ['Good', 'Replaced', 'Repainted', 'Rusted', 'Scratched', 'Dented', 'Faded', 'Damaged', 'Colour Mismatch', 'Other']),
    ...extPart('Chassis Extension', 'chassis_extension', 45, ['Welded', 'Replaced', 'Repaired', 'Damaged', 'Rusted', 'Other'], false),
    { type: 'radio', label: 'Tyre Rear RHS', fieldKey: 'tyre_rear_rhs', isRequired: true, order: 47, options: opts(TYRE_CONDITIONS) },

    // ── Rear Right ───────────────────────────────────────────────
    imgField('Rear Right', 'rear_right_image', 48),
    ...extPart('RH Rear View Mirror', 'rh_rear_view_mirror', 49, MIRROR_CONDITIONS),
    ...extPart('Fuel Lid', 'fuel_lid', 51, ['Good', 'Damaged', 'Rusted', 'Other']),
    ...extPart('Dicky Door', 'dicky_door', 53, ['Good', 'Replaced', 'Repainted', 'Repaired', 'Rusted', 'Scratched', 'Dented', 'Faded', 'Damaged', 'Colour Mismatch', 'Other']),
    ...extPart('Rear Windshield', 'rear_windshield', 55, ['Good', 'Scratched', 'Damaged', 'Not Available', 'Spots', 'Rusted', 'Replaced', 'Chipped', 'Faded', 'Other']),
    ...extPart('Rear Bumper', 'rear_bumper', 57, BODY_CONDITIONS),
    ...extPart('Tail Light RH', 'tail_light_rh', 59, TAIL_LIGHT_CONDITIONS),
    ...extPart('Tail Light LH', 'tail_light_lh', 61, TAIL_LIGHT_CONDITIONS),

    // ── Rear Left ────────────────────────────────────────────────
    imgField('Rear Left', 'rear_left_image', 63),
    imgField('Rear Image', 'rear_image', 64),
    ...extPart('Boot', 'boot', 65, ['Good', 'Damaged', 'Repaired', 'Rusted', 'Welded', 'Water Inside', 'Sealant Broken', 'Other']),
    { type: 'checkbox', label: 'Spare Wheel', fieldKey: 'spare_wheel', isRequired: true, order: 67, options: opts(['Yes', 'No', '0-25%', '25-50%', '50-75%', '75%-100%', 'Damaged']) },
    { type: 'radio', label: 'Jack & Tool', fieldKey: 'jack_and_tool', isRequired: true, order: 68, options: opts(['Yes', 'No']) },
    ...extPart('LH-C Pillar', 'lh_c_pillar', 69, PILLAR_CONDITIONS),
    ...extPart('LH Quarter Panel', 'lh_quarter_panel', 71, ['Good', 'Scratched', 'Dented', 'Damaged', 'Repaired', 'Missing', 'Rusted', 'Repainted', 'Other']),
    { type: 'radio', label: 'Tyre Rear LHS', fieldKey: 'tyre_rear_lhs', isRequired: true, order: 73, options: opts(TYRE_CONDITIONS) },
    ...extPart('Rear LH Door', 'rear_lh_door', 74, DOOR_CONDITIONS),
    ...extPart('Rear Door Glass LH', 'rear_door_glass_lh', 76, GLASS_CONDITIONS),
    ...extPart('LH Running Board', 'lh_running_board', 78, ['Good', 'Replaced', 'Repainted', 'Rusted', 'Scratched', 'Dented', 'Repaired', 'Faded', 'Damaged', 'Colour Mismatch', 'Welded', 'Other']),
    ...extPart('LH-B Pillar', 'lh_b_pillar', 80, PILLAR_CONDITIONS),
    ...extPart('Front LH Door', 'front_lh_door', 82, DOOR_CONDITIONS),
    ...extPart('Front Door Glass LH', 'front_door_glass_lh', 84, GLASS_CONDITIONS),

    // ── Left ─────────────────────────────────────────────────────
    imgField('Left Image', 'left_image', 86),
    ...extPart('LH A Pillar', 'lh_a_pillar', 87, PILLAR_CONDITIONS),
    { type: 'radio', label: 'Tyre Front LHS', fieldKey: 'tyre_front_lhs', isRequired: true, order: 89, options: opts(TYRE_CONDITIONS) },
    ...extPart('LH Rear View Mirror', 'lh_rear_view_mirror', 90, MIRROR_CONDITIONS),
    ...extPart('LH Fender', 'lh_fender', 92, ['Good', 'Scratched', 'Dented', 'Damaged', 'Repaired', 'Missing', 'Rusted', 'Repainted', 'Other']),

    // ── Front Left ───────────────────────────────────────────────
    imgField('Front Left Image', 'front_left_image', 94),
    ...extPart('Apron LH', 'apron_lh', 95, APRON_CONDITIONS, false),
    ...extPart('Apron RH', 'apron_rh', 97, APRON_CONDITIONS, false),
    ...extPart('Upper Cross Member', 'upper_cross_member', 99, CROSS_MEMBER_CONDS),
    ...extPart('Lower Cross Member', 'lower_cross_member', 101, CROSS_MEMBER_CONDS),
    // Cowl Top – no "Good" option, multi-select without Good-lock rule
    { type: 'checkbox', label: 'Cowl Top', fieldKey: 'cowl_top', isRequired: false, order: 103, options: opts(['Damaged', 'Repainted', 'Repaired', 'Rusted', 'Other']) },
    imgField('Cowl Top Image', 'cowl_top_image', 104, false),
    ...extPart('Firewall', 'firewall', 105, ['Good', 'Damaged', 'Repaired', 'Rusted', 'Repainted', 'Other'], false),
    ...extPart('Rear Wiper', 'rear_wiper', 107, ['Good', 'Damaged', 'Replaced', 'Not Available', 'Other']),

    // ── Misc ─────────────────────────────────────────────────────
    { type: 'textfield', label: 'Missing Parts', fieldKey: 'missing_parts', placeholder: 'List missing parts', isRequired: true, order: 109 },
    { type: 'radio', label: 'Full Body Repaint', fieldKey: 'full_body_repaint', isRequired: true, order: 110, options: opts(['Yes', 'No']) },
];
