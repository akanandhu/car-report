import { opts } from './fields-basic';

/**
 * Test Drive section.
 */
export const TEST_DRIVE_FIELDS = [
    { type: 'radio', label: 'Steering System', fieldKey: 'steering_system', isRequired: true, order: 1, options: opts(['Electric', 'Hydraulic']) },
    { type: 'checkbox', label: 'Steering Wheel', fieldKey: 'steering_wheel', isRequired: true, order: 2, options: opts(['Good', 'Hard', 'Abnormal Noise', 'Electric Not Working', 'Hydraulic Not Working', 'Not Working', 'Other']) },
    { type: 'radio', label: 'Steering Adjustment', fieldKey: 'steering_adjustment', isRequired: true, order: 3, options: opts(['Tilt', 'Telescopic', 'Not Available']) },
    { type: 'radio', label: 'Steering Mounted Audio Control', fieldKey: 'steering_audio_control', isRequired: true, order: 4, options: opts(['Working', 'Not Available', 'Not Working', 'Other']) },
    // Frontend enforces: if 'Working' selected, clear others
    { type: 'checkbox', label: 'Cruise Control', fieldKey: 'cruise_control', isRequired: true, order: 5, options: opts(['Working', 'Not Working', 'Not Available']) },
    { type: 'checkbox', label: 'Seat Adjustment', fieldKey: 'seat_adjustment', isRequired: false, order: 6, options: opts(['Available', 'Height Adjustable', 'Not Available']) },
    // Frontend enforces: if 'Good' selected, clear others
    { type: 'checkbox', label: 'Suspension System', fieldKey: 'suspension_system', isRequired: true, order: 7, options: opts(['Good', 'Leaking', 'Abnormal Noise', 'Damaged', 'Weak', 'Other']) },
    { type: 'checkbox', label: 'Brakes', fieldKey: 'brakes', isRequired: true, order: 8, options: opts(['Good', 'Weak', 'Noisy', 'Other']) },
    { type: 'checkbox', label: 'Clutch System', fieldKey: 'clutch_system', isRequired: true, order: 9, options: opts(['Good', 'Slipping', 'Hard', 'Other']) },
    { type: 'checkbox', label: 'Transmission Automatic', fieldKey: 'transmission_automatic', isRequired: true, order: 10, options: opts(['Good', 'Not Available', 'Abnormal Noise', 'Gear Not Engaged', 'Other']) },
    { type: 'checkbox', label: 'Vehicle Horn', fieldKey: 'vehicle_horn', isRequired: true, order: 11, options: opts(['Good', 'Working', 'Modified', 'Not Working', 'Damaged', 'Other']) },
];

/**
 * Features section.
 */
export const FEATURES_FIELDS = [
    { type: 'checkbox', label: 'Keyless Entry', fieldKey: 'keyless_entry', isRequired: true, order: 1, options: opts(['Remote Lock', 'Central Lock', 'Not Available', 'Not Working', 'Remote Key Damaged', 'Other']) },
    { type: 'file', label: 'Keyless Entry Image', fieldKey: 'keyless_entry_image', isRequired: false, order: 2, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'checkbox', label: 'Stereo Image', fieldKey: 'stereo', isRequired: true, order: 3, options: opts(['Good', 'Not Available', 'Customer will take Stereo', 'Touch Stereo', 'Not Working', 'Other']) },
    { type: 'file', label: 'Stereo Image Upload', fieldKey: 'stereo_image', isRequired: false, order: 4, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'textfield', label: 'Stereo Brand', fieldKey: 'stereo_brand', placeholder: 'Enter stereo brand', isRequired: true, order: 5 },
    { type: 'radio', label: 'Rear Parking Sensor', fieldKey: 'rear_parking_sensor', isRequired: false, order: 6, options: opts(['Working', 'Not Working', 'Not Available']) },
    // Frontend enforces: if 'Working' selected, clear others
    { type: 'checkbox', label: 'Sunroof', fieldKey: 'sunroof', isRequired: true, order: 7, options: opts(['Working', 'Not Available', 'Not Working', 'Damaged', 'Replaced', 'Other']) },
    { type: 'file', label: 'Sunroof Image', fieldKey: 'sunroof_image', isRequired: false, order: 8, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'GPS Navigation', fieldKey: 'gps_navigation', isRequired: false, order: 9, options: opts(['Not Available', 'Not Working', 'Available']) },
    { type: 'checkbox', label: 'Alloy Wheels', fieldKey: 'alloy_wheels', isRequired: true, order: 10, options: opts(['Yes', 'Good', 'Not available', 'Scratched', 'Drum Scratched', 'Alloy Wheel Missing', 'Damaged', 'Other']) },
    { type: 'file', label: 'Alloy Wheels Image', fieldKey: 'alloy_wheels_image', isRequired: false, order: 11, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'Fog Lamps', fieldKey: 'fog_lamps_feature', isRequired: false, order: 12, options: opts(['Working', 'Not Available', 'Damaged', 'Needs Replacement']) },
    { type: 'checkbox', label: 'Air Bag', fieldKey: 'air_bag', isRequired: true, order: 13, options: opts(['1', '2', '2+', 'Not Available', 'Damaged', 'Deployed', 'Other']) },
    { type: 'file', label: 'Air Bag Image', fieldKey: 'air_bag_image', isRequired: false, order: 14, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'radio', label: 'Seat Belt', fieldKey: 'seat_belt', isRequired: true, order: 15, options: opts(['Working', 'Not Working', 'Damaged']) },
    // Frontend enforces: if 'Functioning' selected, clear others
    { type: 'checkbox', label: 'ABS EBD (Anti-lock Braking System)', fieldKey: 'abs_ebd', isRequired: true, order: 16, options: opts(['Functioning', 'Not Functioning', 'Not Available', 'ABS EBD Sensor Damaged', 'ABS EBD Module Damaged']) },
    { type: 'file', label: 'ABS EBD Image', fieldKey: 'abs_ebd_image', isRequired: false, order: 17, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'checkbox', label: 'Glove Box', fieldKey: 'glove_box', isRequired: true, order: 18, options: opts(['Cooled Glove Box Available', 'Good', 'Damaged', 'Door Damaged', 'Scratched', 'Other']) },
    { type: 'file', label: 'Glove Box Image', fieldKey: 'glove_box_image', isRequired: false, order: 19, validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 } },
    { type: 'textfield', label: 'Any Interior Modifications', fieldKey: 'interior_modifications', placeholder: 'Describe any modifications', isRequired: false, order: 20 },
];

/**
 * Air Conditioning section.
 */
export const AIR_CONDITIONING_FIELDS = [
    { type: 'radio', label: 'AC Working', fieldKey: 'ac_working', isRequired: true, order: 1, options: opts(['Yes', 'No']) },
    { type: 'checkbox', label: 'Cooling', fieldKey: 'ac_cooling', isRequired: true, order: 2, options: opts(['Good', 'Cooling Low', 'Not Working', 'AC Gas Leaking', 'AC Gas Low', 'AC Gas Empty', 'AC Gas Okay', 'Other']) },
    { type: 'radio', label: 'Heater', fieldKey: 'heater', isRequired: true, order: 3, options: opts(['Not Available', 'Not Working', 'Good']) },
    { type: 'radio', label: 'Climate Control', fieldKey: 'climate_control', isRequired: true, order: 4, options: opts(['Yes', 'No']) },
    // Frontend enforces: if 'Good' selected, clear others
    { type: 'checkbox', label: 'AC Condenser Compressor', fieldKey: 'ac_condenser_compressor', isRequired: true, order: 5, options: opts(['Good', 'Weak Compression', 'Noisy', 'Not Working']) },
    { type: 'radio', label: 'AC Filter Damaged', fieldKey: 'ac_filter_damaged', isRequired: false, order: 6, options: opts(['Yes', 'No']) },
    { type: 'radio', label: 'AC Blower Grill', fieldKey: 'ac_blower_grill', isRequired: false, order: 7, options: opts(['Good', 'Noisy', 'Fan not working']) },
    { type: 'radio', label: 'Rear Defogger', fieldKey: 'rear_defogger', isRequired: false, order: 8, options: opts(['Good', 'Not Working', 'Damaged', 'Not Available']) },
];

/**
 * Special Comments section.
 * Frontend enforces: if 'Good' selected, clear others.
 */
export const SPECIAL_COMMENTS_FIELDS = [
    {
        type: 'checkbox', label: 'Special Comments', fieldKey: 'special_comments', isRequired: true, order: 1,
        options: opts([
            'Good', 'Flood Affected', 'Total Loss', 'Apron Replaced', 'Apron Repaired', 'Roof Replaced',
            'Converted to Private', 'Commercial Vehicle', 'Fitness Expired', 'Engine Replaced',
            'Odometer Tampered', 'Re-registered Vehicle', 'Body Shell Replacement', 'Chassis Extension Repair',
            'RC/Tax Expired', 'Scrap Vehicle', 'Remote key not available/damaged', 'Towing Required',
        ]),
    },
];

/**
 * Manual Ratings section – 1-5 star ratings per category + voice note + selfie.
 */
export const MANUAL_RATINGS_FIELDS = [
    ...[
        { label: 'Exterior Rating', key: 'rating_exterior' },
        { label: 'Interior Rating', key: 'rating_interior' },
        { label: 'Engine Rating', key: 'rating_engine' },
        { label: 'Electrical Rating', key: 'rating_electrical' },
        { label: 'Test Drive Rating', key: 'rating_test_drive' },
    ].map((r, i) => ({
        type: 'number', label: r.label, fieldKey: r.key, isRequired: true, order: i + 1,
        validation: { min: 1, max: 5 },
        options: [
            { label: '1 – Poor', value: '1' },
            { label: '2 – Fair', value: '2' },
            { label: '3 – Good', value: '3' },
            { label: '4 – Very Good', value: '4' },
            { label: '5 – Excellent', value: '5' },
        ],
    })),
    {
        type: 'file', label: 'Voice Note of the Evaluator', fieldKey: 'evaluator_voice_note', isRequired: false, order: 6,
        validation: { allowedFileTypes: ['.mp3', '.wav', '.m4a', '.ogg'], maxFileSize: 10485760, maxDurationSeconds: 60 },
    },
    {
        type: 'file', label: 'Selfie with the Car', fieldKey: 'selfie_with_car', isRequired: true, order: 7,
        placeholder: 'Take a selfie with the car ensuring the registration number is visible',
        validation: { allowedFileTypes: ['.jpg', '.jpeg', '.png'], maxFileSize: 10485760 },
    },
];
