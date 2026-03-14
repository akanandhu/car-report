import { opts } from './fields-basic';

/** checkbox + image helper for engine parts */
const engPart = (label: string, fieldKey: string, order: number, conditions: string[], required = true) => [
    { type: 'checkbox', label, fieldKey, isRequired: required, order, options: opts(conditions) },
    { type: 'file', label: `${label} Image`, fieldKey: `${fieldKey}_image`, isRequired: false, order: order + 0.5, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760, maxFiles: 4, minFiles: 1 } },
];

/**
 * Engine section – engine compartment, mechanical, fluids, drivetrain.
 */
export const ENGINE_FIELDS = [
    { type: 'file', label: 'Engine Compartment Image', fieldKey: 'engine_compartment_image', isRequired: true, order: 1, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'Engine Sound', fieldKey: 'engine_sound', isRequired: true, order: 2, options: opts(['Normal', 'Minor Sound', 'Major Sound', 'Critical Sound']) },
    ...engPart('Engine', 'engine_condition', 3, ['Condition Ok', 'Repaired', 'Tappet Noise', 'Timing Noise', 'Silencer Noise', 'Turbo & Whistling Noise', 'Injector Leakage', 'Turbo Leakage', 'Weak Compression', 'Air Filter Box Damaged', 'RPM Fluctuating', 'Other']),
    { type: 'checkbox', label: 'Smoke', fieldKey: 'smoke', isRequired: true, order: 5, options: opts(['Normal', 'White', 'Black', 'Blue', 'Other']) },
    { type: 'file', label: 'Engine Idle Start Video', fieldKey: 'engine_idle_start_video', isRequired: true, order: 6, validation: { allowedFileTypes: ['.mp4', '.mov', '.avi'], maxFileSize: 52428800 } },
    ...engPart('Battery', 'battery', 7, ['Good', 'Weak', 'Terminal Corroded', 'Fluid Leakage', 'Jumpstart']),
    { type: 'checkbox', label: 'Radiator', fieldKey: 'radiator', isRequired: true, order: 9, options: opts(['Good', 'Damaged', 'Leak', 'Other']) },
    { type: 'checkbox', label: 'Starting Motor', fieldKey: 'starting_motor', isRequired: true, order: 10, options: opts(['Good', 'Damaged', 'Manifold', 'Malfunctioning', 'Not Working', 'Other']) },
    { type: 'checkbox', label: 'Coolant', fieldKey: 'coolant', isRequired: true, order: 11, options: opts(['Good', 'Dirty', 'Oil Mix', 'Leak', 'Other']) },
    ...engPart('Blowby Back Compression', 'blowby_back_compression', 12, ['No Blowby', 'Blowby on Idle', 'Oil Spillage on Idle', 'Back Compression', 'Other']),
    ...engPart('Silencer', 'silencer', 14, ['Good', 'Noisy', 'Damaged', 'Other']),
    ...engPart('Clutch Operations', 'clutch_operations', 16, ['Good', 'Slipping', 'Hard', 'Spongy', 'Other']),
    ...engPart('Gearbox', 'gearbox', 18, ['Good', 'Shift Hard', 'Not Engaging', 'Noisy', 'Jittering', 'Not Satisfactory', 'Other']),
    ...engPart('Engine Oil', 'engine_oil', 20, ['Good', 'Leakage from Tappet Cover', 'Leakage from Side Cover', 'Low', 'Dirty', 'Other']),
    ...engPart('Turbo Charger', 'turbo_charger', 22, ['Working', 'Leakage', 'Not Working', 'Noisy', 'Other'], false),
    { type: 'radio', label: 'Gearbox Leakage', fieldKey: 'gearbox_leakage', isRequired: true, order: 24, options: opts(['Yes', 'No']) },
    { type: 'textfield', label: 'Engine Comments (Remark)', fieldKey: 'engine_comments', placeholder: 'Enter detailed remarks and observations', isRequired: true, order: 25 },
    ...engPart('Engine Mount', 'engine_mount', 26, ['Good', 'Jerking', 'Damaged', 'Other'], false),
    ...engPart('Sump', 'sump', 28, ['Good', 'Damaged', 'Leakage', 'Other']),
];
