export const engineSoundOptions = [
    { label: "Normal", value: "Normal" },
    { label: "Minor Sound", value: "Minor Sound" },
    { label: "Major Sound", value: "Major Sound" },
    { label: "Critical Sound", value: "Critical Sound" },
  ];
  // Engine* Options: [Condition Ok, Repaired, Tappet Noise, Timing Noise, Silencer Noise, Turbo & Whistling Noise, Injector Leakage, Turbo Leakage, Weak Compression, Air Filter Box Damaged, RPM Fluctuating, Other]
  export const engineConditionOptions = [
    { label: "Condition Ok", value: "Condition Ok" },
    { label: "Repaired", value: "Repaired" },
    { label: "Tappet Noise", value: "Tappet Noise" },
    { label: "Timing Noise", value: "Timing Noise" },
    { label: "Silencer Noise", value: "Silencer Noise" },
    { label: "Turbo & Whistling Noise", value: "Turbo & Whistling Noise" },
    { label: "Injector Leakage", value: "Injector Leakage" },
    { label: "Turbo Leakage", value: "Turbo Leakage" },
    { label: "Weak Compression", value: "Weak Compression" },
    { label: "Air Filter Box Damaged", value: "Air Filter Box Damaged" },
    { label: "RPM Fluctuating", value: "RPM Fluctuating" },
    { label: "Other", value: "Other" },
  ];

  // Smoke* Options: [Normal, White, Black, Blue, Other] 
  export const smokeOptions = [
    { label: "Normal", value: "Normal" },
    { label: "White", value: "White" },
    { label: "Black", value: "Black" },
    { label: "Blue", value: "Blue" },
    { label: "Other", value: "Other" },
  ];

  // Engine Idle Start Video* Condition: Provide footage, if possible with  acceleration and without acceleration for comprehensive assessment. 

  export const engineIdleStartOptions = [
    { label: "Normal", value: "Normal" },
    { label: "Rough Idle", value: "Rough Idle" },
    { label: "Stalling", value: "Stalling" },
    { label: "Other", value: "Other" },
  ];

  // Battery* Options: [Good, Weak, Terminal Corroded, Fluid Leakage, Jumpstart]
  export const batteryOptions = [
    { label: "Good", value: "Good" },
    { label: "Weak", value: "Weak" },
    { label: "Terminal Corroded", value: "Terminal Corroded" },
    { label: "Fluid Leakage", value: "Fluid Leakage" },
    { label: "Jumpstart", value: "Jumpstart" },
  ];  


  // Radiator* Options: [Good, Damaged, Leak, Other]
  export const radiatorOptions = [
    { label: "Good", value: "Good" },
    { label: "Damaged", value: "Damaged" },
    { label: "Leak", value: "Leak" },
    { label: "Other", value: "Other" },
  ];

  // Starting Motor* Options: [Good, Damaged, Manifold, Malfunctioning, Not Working, Other]
  export const startingMotorOptions = [
    { label: "Good", value: "Good" },
    { label: "Damaged", value: "Damaged" },
    { label: "Manifold", value: "Manifold" },
    { label: "Malfunctioning", value: "Malfunctioning" },
    { label: "Not Working", value: "Not Working" },
    { label: "Other", value: "Other" },
  ];

  // Coolant* Options: [Good, Dirty, Oil Mix, Leak, Other]
  export const coolantOptions = [
    { label: "Good", value: "Good" },
    { label: "Dirty", value: "Dirty" },   
    { label: "Oil Mix", value: "Oil Mix" },
    { label: "Leak", value: "Leak" },
    { label: "Other", value: "Other" },
  ];

  // Blowby Back Compression* Options: [No Blowby, Blowby on Idle, Oil Spillage on Idle, Back Compression, Other]
  export const blowbyBackCompressionOptions = [
    { label: "No Blowby", value: "No Blowby" },
    { label: "Blowby on Idle", value: "Blowby on Idle" },
    { label: "Oil Spillage on Idle", value: "Oil Spillage on Idle" },
    { label: "Back Compression", value: "Back Compression" },
    { label: "Other", value: "Other" },
  ];

  // Silencer* Options: [Good, Noisy, Damaged, Other]
  export const silencerOptions = [
    { label: "Good", value: "Good" },
    { label: "Noisy", value: "Noisy" },
    { label: "Damaged", value: "Damaged" },
    { label: "Other", value: "Other" },
  ];

  // Clutch Operations* Options: [Good, Slipping, Hard, Spongy, Other]
    export const clutchOperationsOptions = [
    { label: "Good", value: "Good" },
    { label: "Slipping", value: "Slipping" },
    { label: "Hard", value: "Hard" },
    { label: "Spongy", value: "Spongy" },
    { label: "Other", value: "Other" },
  ];

  // Gearbox* Options: [Good, Shift Hard, Not Engaging, Noisy, Jittering, Not Satisfactory, Other]
    export const gearboxOptions = [
    { label: "Good", value: "Good" },
    { label: "Shift Hard", value: "Shift Hard" },
    { label: "Not Engaging", value: "Not Engaging" },   
    { label: "Noisy", value: "Noisy" },
    { label: "Jittering", value: "Jittering" },
    { label: "Not Satisfactory", value: "Not Satisfactory" },
    { label: "Other", value: "Other" },
  ];

  // Engine Oil* Options: [Good, Leakage from Tappet Cover, Leakage from Side Cover, Low, Dirty, Other]
    export const engineOilOptions = [
    { label: "Good", value: "Good" },
    { label: "Leakage from Tappet Cover", value: "Leakage from Tappet Cover" }, 
    { label: "Leakage from Side Cover", value: "Leakage from Side Cover" },
    { label: "Low", value: "Low" },
    { label: "Dirty", value: "Dirty" },
    { label: "Other", value: "Other" },
  ];


  // Turbo Charger Options: [Working, Leakage, Not Working, Noisy, Other]
  export const turboChargerOptions = [
    { label: "Working", value: "Working" },
    { label: "Leakage", value: "Leakage" },
    { label: "Not Working", value: "Not Working" },
    { label: "Noisy", value: "Noisy" },
    { label: "Other", value: "Other" },
  ];

  // Gearbox Leakage* Options: [Yes, No]
  export const gearboxLeakageOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  // Engine Mount Options: [Good, Jerking, Damaged, Other]
    export const engineMountOptions = [
    { label: "Good", value: "Good" },
    { label: "Jerking", value: "Jerking" }, 
    { label: "Damaged", value: "Damaged" },
    { label: "Other", value: "Other" },
  ];

  // Sump* Options: [Good, Damaged, Leakage, Other]
    export const sumpOptions = [
    { label: "Good", value: "Good" },
    { label: "Damaged", value: "Damaged" }, 
    { label: "Leakage", value: "Leakage" },
    { label: "Other", value: "Other" },
  ];
