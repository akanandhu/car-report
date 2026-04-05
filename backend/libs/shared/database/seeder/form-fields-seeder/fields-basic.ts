/** Helper to build {label, value} options from a string array */
export const opts = (items: string[]) =>
    items.map((i) => ({ label: i, value: i.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+$/, '') }));

/**
 * Basic Information – seller details, registration, vehicle specs, odometer, etc.
 */
export const BASIC_FIELDS = [
    // ── Seller info ──────────────────────────────────────────────
    { type: 'textfield', label: 'Seller Full Name', fieldKey: 'seller_full_name', placeholder: 'Enter seller full name', isRequired: false, order: 1 },
    { type: 'textfield', label: 'Seller Address', fieldKey: 'seller_address', placeholder: 'Enter seller address', isRequired: false, order: 2 },
    { type: 'textfield', label: 'Seller Phone Number', fieldKey: 'seller_phone', placeholder: 'Enter seller phone number', isRequired: false, order: 3, validation: { pattern: '^[0-9]{10}$', patternMessage: 'Enter a valid 10-digit phone number' } },
    { type: 'textfield', label: 'Seller Email ID', fieldKey: 'seller_email', placeholder: 'Enter seller email', isRequired: false, order: 4, validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$', patternMessage: 'Enter a valid email address' } },

    // ── Registration ─────────────────────────────────────────────
    { type: 'radio', label: 'Registered', fieldKey: 'registered', isRequired: true, order: 5, options: opts(['Yes', 'No', 'Scrap']) },
    { type: 'textfield', label: 'Registration Number', fieldKey: 'registration_number', placeholder: 'Enter Chassis Number if Reg Number is not available', isRequired: true, order: 6 },

    // ── Vehicle identity (cascading dropdowns via endpoints) ─────
    { type: 'select', label: "Car Maker's Name (Brand)", fieldKey: 'car_brand', isRequired: true, order: 7, endpoint: 'catalogue/makes' },
    { type: 'select', label: 'Manufacturing Year', fieldKey: 'manufacturing_year', isRequired: true, order: 8, conditions: { dependsOn: 'car_brand', operator: 'not_empty', action: 'show' } },
    { type: 'select', label: 'Car Model Name', fieldKey: 'car_model', isRequired: true, order: 9, endpoint: 'catalogue/models?make_id={car_brand}&make_year={manufacturing_year}', conditions: { dependsOn: 'manufacturing_year', operator: 'not_empty', action: 'show' } },

    // ── Fuel type & transmission (derived from variant data on frontend) ─
    { type: 'radio', label: 'Fuel Type', fieldKey: 'fuel_type', isRequired: true, order: 10, conditions: { dependsOn: 'car_model', operator: 'not_empty', action: 'show' } },
    { type: 'radio', label: 'Transmission Type', fieldKey: 'transmission_type', isRequired: true, order: 11, conditions: { dependsOn: 'fuel_type', operator: 'not_empty', action: 'show' } },
    { type: 'select', label: 'Car Variant', fieldKey: 'car_variant', isRequired: true, order: 12, conditions: { dependsOn: 'transmission_type', operator: 'not_empty', action: 'show' } },

    // ── Post-variant fields (options come from cached config on frontend) ─
    { type: 'select', label: 'Ownership Number', fieldKey: 'ownership_number', isRequired: true, order: 13, conditions: { dependsOn: 'car_variant', operator: 'not_empty', action: 'show' } },
    { type: 'select', label: 'Kms Driven', fieldKey: 'kms_driven', isRequired: true, order: 14, conditions: { dependsOn: 'car_variant', operator: 'not_empty', action: 'show' } },
    { type: 'radio', label: 'When do you want to sell this car?', fieldKey: 'sell_time', isRequired: true, order: 15, conditions: { dependsOn: 'car_variant', operator: 'not_empty', action: 'show' } },
    { type: 'textfield', label: 'Engine Number', fieldKey: 'engine_number', placeholder: 'Enter engine number', isRequired: true, order: 16 },

    // ── Chassis ──────────────────────────────────────────────────
    { type: 'radio', label: 'Chassis Number', fieldKey: 'chassis_number_available', isRequired: true, order: 17, options: opts(['Yes', 'Not Traceable']) },
    { type: 'textfield', label: 'Chassis Number Value', fieldKey: 'chassis_number_value', placeholder: 'Enter chassis number', isRequired: true, order: 18, conditions: { dependsOn: 'chassis_number_available', operator: 'equals', value: 'yes', action: 'show' } },

    // ── RC owner ─────────────────────────────────────────────────
    { type: 'textfield', label: 'RC Owner Name', fieldKey: 'rc_owner_name', placeholder: 'Enter RC owner name', isRequired: true, order: 19 },
    { type: 'textfield', label: 'RC Owner Phone Number', fieldKey: 'rc_owner_phone', placeholder: 'Enter RC owner phone', isRequired: true, order: 20 },

    // ── Dates ────────────────────────────────────────────────────
    { type: 'datepicker', label: 'Date of Registration', fieldKey: 'date_of_registration', isRequired: true, order: 21 },
    { type: 'datepicker', label: 'Registration Validity', fieldKey: 'registration_validity', isRequired: true, order: 22 },
    { type: 'datepicker', label: 'Tax Validity', fieldKey: 'tax_validity', isRequired: true, order: 23 },

    // ── Location & RTO ──────────────────────────────────────────
    { type: 'select', label: 'Registration State', fieldKey: 'registration_state', isRequired: true, order: 24, endpoint: '/api/indian-states' },
    { type: 'textfield', label: 'Registered RTO', fieldKey: 'registered_rto', placeholder: 'Start typing RTO name…', isRequired: true, order: 25, endpoint: '/api/rto-search' },
    { type: 'select', label: 'Vehicle Location', fieldKey: 'vehicle_location', isRequired: true, order: 26, options: opts(['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod']) },

    // ── Engine specs ─────────────────────────────────────────────
    {
        type: 'select', label: 'Engine CC', fieldKey: 'engine_cc', isRequired: true, order: 27,
        options: [
            ...[796, 999, 1000, 1086, 1197, 1198, 1199, 1248, 1341, 1396, 1462, 1493, 1497, 1498, 1582, 1591, 1598, 1797, 1956, 1995, 1997, 1998, 1999, 2143, 2179, 2199, 2487, 2494, 2498, 2755, 2993, 2995, 2996, 3198, 5461].map(cc => ({ label: `${cc}cc`, value: `${cc}` })),
            { label: 'Other', value: 'other' },
        ],
    },
    { type: 'textfield', label: 'Engine CC (Other)', fieldKey: 'engine_cc_other', placeholder: 'Enter engine CC', isRequired: true, order: 28, conditions: { dependsOn: 'engine_cc', operator: 'equals', value: 'other', action: 'show' } },
    { type: 'select', label: 'Number of Cylinders', fieldKey: 'number_of_cylinders', isRequired: false, order: 29, options: opts(['2', '3', '4', '5', '6', '8', '10', '12']) },

    // ── Usage, colour, body ──────────────────────────────────────
    { type: 'radio', label: 'Vehicle Usage', fieldKey: 'vehicle_usage', isRequired: true, order: 30, options: opts(['Motor Cab(Taxi)', 'Motor Car(Private)']) },
    { type: 'select', label: 'Colour', fieldKey: 'colour', isRequired: true, order: 31, endpoint: '/api/car-colours' },
    {
        type: 'select', label: 'Body Type', fieldKey: 'body_type', isRequired: true, order: 32,
        options: opts(['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'MPV (Multi-Purpose Vehicle)', 'Station Wagon', 'Pickup Truck', 'Crossover', 'Mini Van', 'Micro Car', 'Compact SUV', 'Subcompact SUV', 'Luxury Sedan', 'Sports Car', 'Super Car', 'Off-Road Vehicle']),
    },
    { type: 'select', label: 'Seating Capacity', fieldKey: 'seating_capacity', isRequired: false, order: 33, options: opts(['2-Seater', '4-Seater', '5-Seater', '6-Seater', '7-Seater', '8-Seater', '9-Seater', '10-Seater', '12-Seater', '14-Seater', '15-Seater and above']) },

    // ── Keys & RC ────────────────────────────────────────────────
    { type: 'radio', label: 'Duplicate Key', fieldKey: 'duplicate_key', isRequired: true, order: 34, options: opts(['Yes', 'No']) },
    { type: 'radio', label: 'RC Availability', fieldKey: 'rc_availability', isRequired: true, order: 35, options: opts(['Original', 'Photocopy', 'Duplicate', 'Lost']) },
    { type: 'number', label: 'Customer Price', fieldKey: 'customer_price', placeholder: 'Enter customer expected price', isRequired: true, order: 36, validation: { min: 0 } },

    // ── Odometer ─────────────────────────────────────────────────
    { type: 'radio', label: 'Odometer Working', fieldKey: 'odometer_working', isRequired: true, order: 37, options: opts(['Yes', 'No']) },
    { type: 'number', label: 'Odometer Reading', fieldKey: 'odometer_reading', placeholder: 'Enter odometer reading in km', isRequired: true, order: 38, validation: { min: 0, max: 999999 }, conditions: { dependsOn: 'odometer_working', operator: 'equals', value: 'yes', action: 'show' } },

    // ── Accidental & warranty ────────────────────────────────────
    { type: 'radio', label: 'Accidental', fieldKey: 'accidental', isRequired: true, order: 39, options: opts(['Yes', 'No']) },
    { type: 'radio', label: 'OEM Warranty', fieldKey: 'oem_warranty', isRequired: false, order: 40, options: opts(['Yes', 'No']) },
    { type: 'number', label: 'Number of OEM Months Remaining', fieldKey: 'oem_months_remaining', isRequired: false, order: 41, validation: { min: 0 }, conditions: { dependsOn: 'oem_warranty', operator: 'equals', value: 'yes', action: 'show' } },
    { type: 'number', label: 'Number of OEM Kms Remaining', fieldKey: 'oem_kms_remaining', isRequired: false, order: 42, validation: { min: 0 }, conditions: { dependsOn: 'oem_warranty', operator: 'equals', value: 'yes', action: 'show' } },
    { type: 'textfield', label: 'Remarks', fieldKey: 'basic_remarks', placeholder: 'Additional notes', isRequired: false, order: 43 },
];
