export type RtoOption = { label: string; value: string };

export const INDIAN_STATE_OPTIONS: RtoOption[] = [
  {
    label: 'Andaman and Nicobar Islands',
    value: 'AN',
  },
  {
    label: 'Andhra Pradesh',
    value: 'AP',
  },
  {
    label: 'Arunachal Pradesh',
    value: 'AR',
  },
  {
    label: 'Assam',
    value: 'AS',
  },
  {
    label: 'Bihar',
    value: 'BR',
  },
  {
    label: 'Chhattisgarh',
    value: 'CG',
  },
  {
    label: 'Goa',
    value: 'GA',
  },
  {
    label: 'Gujarat',
    value: 'GJ',
  },
  {
    label: 'Haryana',
    value: 'HR',
  },
  {
    label: 'Himachal Pradesh',
    value: 'HP',
  },
  {
    label: 'Jharkhand',
    value: 'JH',
  },
  {
    label: 'Karnataka',
    value: 'KA',
  },
  {
    label: 'Kerala',
    value: 'KL',
  },
  {
    label: 'Madhya Pradesh',
    value: 'MP',
  },
  {
    label: 'Maharashtra',
    value: 'MH',
  },
  {
    label: 'Manipur',
    value: 'MN',
  },
  {
    label: 'Meghalaya',
    value: 'ML',
  },
  {
    label: 'Mizoram',
    value: 'MZ',
  },
  {
    label: 'Nagaland',
    value: 'NL',
  },
  {
    label: 'Odisha',
    value: 'OD',
  },
  {
    label: 'Punjab',
    value: 'PB',
  },
  {
    label: 'Rajasthan',
    value: 'RJ',
  },
  {
    label: 'Sikkim',
    value: 'SK',
  },
  {
    label: 'Tamil Nadu',
    value: 'TN',
  },
  {
    label: 'Telangana',
    value: 'TS',
  },
  {
    label: 'Tripura',
    value: 'TR',
  },
  {
    label: 'Uttar Pradesh',
    value: 'UP',
  },
  {
    label: 'Uttarakhand',
    value: 'UK',
  },
  {
    label: 'West Bengal',
    value: 'WB',
  },
  {
    label: 'Chandigarh',
    value: 'CH',
  },
  {
    label: 'Dadra and Nagar Haveli and Daman and Diu',
    value: 'DNHDD',
  },
  {
    label: 'The Government of NCT of Delhi',
    value: 'DL',
  },
  {
    label: 'Jammu and Kashmir',
    value: 'JK',
  },
  {
    label: 'Ladakh',
    value: 'LA',
  },
  {
    label: 'Lakshadweep',
    value: 'LD',
  },
  {
    label: 'Puducherry',
    value: 'PY',
  },
];

export const RTO_OPTIONS_BY_STATE: Record<string, RtoOption[]> = {
  AN: [
    {
      label: 'AN-01 - Port Blair',
      value: 'AN-01',
    },
    {
      label: 'AN-02 - Car Nicobar',
      value: 'AN-02',
    },
  ],
  AP: [
    {
      label: 'AP-01 - Adilabad',
      value: 'AP-01',
    },
    {
      label: 'AP-02 - Anantapur',
      value: 'AP-02',
    },
    {
      label: 'AP-03 - Chittoor',
      value: 'AP-03',
    },
    {
      label: 'AP-04 - Kadapa',
      value: 'AP-04',
    },
    {
      label: 'AP-05 - Kakinada',
      value: 'AP-05',
    },
    {
      label: 'AP-07 - Guntur',
      value: 'AP-07',
    },
    {
      label: 'AP-09 - Khairtabad',
      value: 'AP-09',
    },
    {
      label: 'AP-10 - Secunderabad',
      value: 'AP-10',
    },
    {
      label: 'AP-11 - Malakpet',
      value: 'AP-11',
    },
    {
      label: 'AP-12 - Kishanbagh',
      value: 'AP-12',
    },
    {
      label: 'AP-13 - Tolichowki',
      value: 'AP-13',
    },
    {
      label: 'AP-15 - Karimnagar',
      value: 'AP-15',
    },
    {
      label: 'AP-16 - Vijayawada',
      value: 'AP-16',
    },
    {
      label: 'AP-18 - Vijayawada',
      value: 'AP-18',
    },
    {
      label: 'AP-20 - Khammam',
      value: 'AP-20',
    },
    {
      label: 'AP-21 - Kurnool',
      value: 'AP-21',
    },
    {
      label: 'AP-22 - Mahbubnagar',
      value: 'AP-22',
    },
    {
      label: 'AP-23 - Medak',
      value: 'AP-23',
    },
    {
      label: 'AP-24 - Nalgonda',
      value: 'AP-24',
    },
    {
      label: 'AP-25 - Nizamabad',
      value: 'AP-25',
    },
    {
      label: 'AP-26 - Nellore',
      value: 'AP-26',
    },
    {
      label: 'AP-27 - Ongole',
      value: 'AP-27',
    },
    {
      label: 'AP-28 - Attapur',
      value: 'AP-28',
    },
    {
      label: 'AP-29 - Uppal Kalan',
      value: 'AP-29',
    },
    {
      label: 'AP-30 - Srikakulam',
      value: 'AP-30',
    },
    {
      label: 'AP-31 - Visakhapatnam',
      value: 'AP-31',
    },
    {
      label: 'AP-32 - Visakhapatnam',
      value: 'AP-32',
    },
    {
      label: 'AP-33 - Visakhapatnam',
      value: 'AP-33',
    },
    {
      label: 'AP-34 - Vizianagaram',
      value: 'AP-34',
    },
    {
      label: 'AP-36 - Warangal',
      value: 'AP-36',
    },
    {
      label: 'AP-37 - Eluru',
      value: 'AP-37',
    },
  ],
  AR: [
    {
      label: 'AR-01 - Itanagar',
      value: 'AR-01',
    },
    {
      label: 'AR-02 - Itanagar',
      value: 'AR-02',
    },
    {
      label: 'AR-03 - Tawang',
      value: 'AR-03',
    },
    {
      label: 'AR-04 - Bomdila',
      value: 'AR-04',
    },
    {
      label: 'AR-05 - Seppa',
      value: 'AR-05',
    },
    {
      label: 'AR-06 - Ziro',
      value: 'AR-06',
    },
    {
      label: 'AR-07 - Daporijo',
      value: 'AR-07',
    },
    {
      label: 'AR-08 - Along',
      value: 'AR-08',
    },
    {
      label: 'AR-09 - Pasighat',
      value: 'AR-09',
    },
    {
      label: 'AR-10 - Anini',
      value: 'AR-10',
    },
    {
      label: 'AR-11 - Tezu',
      value: 'AR-11',
    },
    {
      label: 'AR-12 - Changlang',
      value: 'AR-12',
    },
    {
      label: 'AR-13 - Khonsa',
      value: 'AR-13',
    },
    {
      label: 'AR-14 - Yingkiong',
      value: 'AR-14',
    },
    {
      label: 'AR-15 - Koloriang',
      value: 'AR-15',
    },
    {
      label: 'AR-16 - Roing',
      value: 'AR-16',
    },
    {
      label: 'AR-17 - Hawai',
      value: 'AR-17',
    },
    {
      label: 'AR-20 - Namsai',
      value: 'AR-20',
    },
  ],
  AS: [],
  BR: [
    {
      label: 'BR-01 - Patna',
      value: 'BR-01',
    },
    {
      label: 'BR-02 - Gaya',
      value: 'BR-02',
    },
    {
      label: 'BR-03 - Arrah',
      value: 'BR-03',
    },
    {
      label: 'BR-04 - Chhapra',
      value: 'BR-04',
    },
    {
      label: 'BR-05 - Motihari',
      value: 'BR-05',
    },
    {
      label: 'BR-06 - Muzaffarpur',
      value: 'BR-06',
    },
    {
      label: 'BR-07 - Darbhanga',
      value: 'BR-07',
    },
    {
      label: 'BR-08 - Munger',
      value: 'BR-08',
    },
    {
      label: 'BR-09 - Begusarai',
      value: 'BR-09',
    },
    {
      label: 'BR-10 - Bhagalpur',
      value: 'BR-10',
    },
    {
      label: 'BR-11 - Purnia',
      value: 'BR-11',
    },
    {
      label: 'BR-13 - Hazaribagh',
      value: 'BR-13',
    },
    {
      label: 'BR-14 - Ranchi',
      value: 'BR-14',
    },
    {
      label: 'BR-15 - Daltonganj',
      value: 'BR-15',
    },
    {
      label: 'BR-16 - Jamshedpur',
      value: 'BR-16',
    },
    {
      label: 'BR-17 - Dhanbad',
      value: 'BR-17',
    },
    {
      label: 'BR-18 - Chaibasa',
      value: 'BR-18',
    },
    {
      label: 'BR-19 - Saharsa',
      value: 'BR-19',
    },
    {
      label: 'BR-20 - Bokaro',
      value: 'BR-20',
    },
    {
      label: 'BR-21 - Bihar Sharif',
      value: 'BR-21',
    },
    {
      label: 'BR-22 - Bettiah',
      value: 'BR-22',
    },
    {
      label: 'BR-23 - Giridih',
      value: 'BR-23',
    },
    {
      label: 'BR-24 - Dehri',
      value: 'BR-24',
    },
    {
      label: 'BR-25 - Jehanabad',
      value: 'BR-25',
    },
    {
      label: 'BR-26 - Aurangabad',
      value: 'BR-26',
    },
    {
      label: 'BR-27 - Nawada',
      value: 'BR-27',
    },
    {
      label: 'BR-28 - Gopalganj',
      value: 'BR-28',
    },
    {
      label: 'BR-29 - Siwan',
      value: 'BR-29',
    },
    {
      label: 'BR-30 - Sitamarhi',
      value: 'BR-30',
    },
    {
      label: 'BR-31 - Hajipur',
      value: 'BR-31',
    },
    {
      label: 'BR-32 - Madhubani',
      value: 'BR-32',
    },
    {
      label: 'BR-33 - Samastipur',
      value: 'BR-33',
    },
    {
      label: 'BR-34 - Khagaria',
      value: 'BR-34',
    },
    {
      label: 'BR-35 - Sahibganj',
      value: 'BR-35',
    },
    {
      label: 'BR-36 - Godda',
      value: 'BR-36',
    },
    {
      label: 'BR-37 - Kishanganj',
      value: 'BR-37',
    },
    {
      label: 'BR-38 - Araria',
      value: 'BR-38',
    },
    {
      label: 'BR-39 - Katihar',
      value: 'BR-39',
    },
    {
      label: 'BR-40 - Deoghar',
      value: 'BR-40',
    },
    {
      label: 'BR-41 - Gumla',
      value: 'BR-41',
    },
    {
      label: 'BR-42 - Lohardaga',
      value: 'BR-42',
    },
    {
      label: 'BR-43 - Madhepura',
      value: 'BR-43',
    },
    {
      label: 'BR-44 - Buxar',
      value: 'BR-44',
    },
    {
      label: 'BR-45 - Bhabua',
      value: 'BR-45',
    },
    {
      label: 'BR-46 - Jamui',
      value: 'BR-46',
    },
    {
      label: 'BR-47 - Koderma',
      value: 'BR-47',
    },
    {
      label: 'BR-50 - Supaul',
      value: 'BR-50',
    },
    {
      label: 'BR-51 - Banka',
      value: 'BR-51',
    },
    {
      label: 'BR-52 - Sheikhpura',
      value: 'BR-52',
    },
    {
      label: 'BR-53 - Lakhisarai',
      value: 'BR-53',
    },
    {
      label: 'BR-55 - Sheohar',
      value: 'BR-55',
    },
    {
      label: 'BR-56 - Arwal',
      value: 'BR-56',
    },
    {
      label: 'BR-57 - Sasaram',
      value: 'BR-57',
    },
  ],
  CG: [
    {
      label: 'CG-01 - Governor of Chhattisgarh',
      value: 'CG-01',
    },
    {
      label: 'CG-02 - Government of Chhattisgarh',
      value: 'CG-02',
    },
    {
      label: 'CG-03 - Chhattisgarh Police',
      value: 'CG-03',
    },
    {
      label: 'CG-04 - Raipur',
      value: 'CG-04',
    },
    {
      label: 'CG-05 - Dhamtari',
      value: 'CG-05',
    },
    {
      label: 'CG-06 - Mahasamund',
      value: 'CG-06',
    },
    {
      label: 'CG-07 - Durg',
      value: 'CG-07',
    },
    {
      label: 'CG-08 - Rajnandgaon',
      value: 'CG-08',
    },
    {
      label: 'CG-09 - Kawardha',
      value: 'CG-09',
    },
    {
      label: 'CG-10 - Bilaspur',
      value: 'CG-10',
    },
    {
      label: 'CG-11 - Janjgir',
      value: 'CG-11',
    },
    {
      label: 'CG-12 - Korba',
      value: 'CG-12',
    },
    {
      label: 'CG-13 - Raigarh',
      value: 'CG-13',
    },
    {
      label: 'CG-14 - Jashpur Nagar',
      value: 'CG-14',
    },
    {
      label: 'CG-15 - Ambikapur',
      value: 'CG-15',
    },
    {
      label: 'CG-16 - Baikunthpur',
      value: 'CG-16',
    },
    {
      label: 'CG-17 - Jagdalpur',
      value: 'CG-17',
    },
    {
      label: 'CG-18 - Dantewada',
      value: 'CG-18',
    },
    {
      label: 'CG-19 - Kanker',
      value: 'CG-19',
    },
    {
      label: 'CG-20 - Bijapur',
      value: 'CG-20',
    },
    {
      label: 'CG-21 - Narayanpur',
      value: 'CG-21',
    },
    {
      label: 'CG-22 - Baloda Bazar',
      value: 'CG-22',
    },
    {
      label: 'CG-23 - Gariaband',
      value: 'CG-23',
    },
    {
      label: 'CG-24 - Balod',
      value: 'CG-24',
    },
    {
      label: 'CG-25 - Bemetara',
      value: 'CG-25',
    },
    {
      label: 'CG-26 - Sukma',
      value: 'CG-26',
    },
    {
      label: 'CG-27 - Kondagaon',
      value: 'CG-27',
    },
    {
      label: 'CG-28 - Mungeli',
      value: 'CG-28',
    },
    {
      label: 'CG-29 - Surajpur',
      value: 'CG-29',
    },
    {
      label: 'CG-30 - Balrampur',
      value: 'CG-30',
    },
  ],
  GA: [
    {
      label: 'GA-01 - Panajim',
      value: 'GA-01',
    },
    {
      label: 'GA-02 - Margao',
      value: 'GA-02',
    },
    {
      label: 'GA-03 - Mapusa',
      value: 'GA-03',
    },
    {
      label: 'GA-04 - Bicholim',
      value: 'GA-04',
    },
    {
      label: 'GA-05 - Ponda',
      value: 'GA-05',
    },
    {
      label: 'GA-06 - Vasco da Gama',
      value: 'GA-06',
    },
    {
      label: 'GA-07 - Panajim',
      value: 'GA-07',
    },
    {
      label: 'GA-08 - Margao',
      value: 'GA-08',
    },
    {
      label: 'GA-09 - Quepem',
      value: 'GA-09',
    },
    {
      label: 'GA-10 - Canacona',
      value: 'GA-10',
    },
    {
      label: 'GA-11 - Pernem',
      value: 'GA-11',
    },
    {
      label: 'GA-12 - Dharbandora',
      value: 'GA-12',
    },
  ],
  GJ: [
    {
      label: 'GJ-01 - Ahmedabad City(West)',
      value: 'GJ-01',
    },
    {
      label: 'GJ-02 - Mehsana',
      value: 'GJ-02',
    },
    {
      label: 'GJ-03 - Rajkot',
      value: 'GJ-03',
    },
    {
      label: 'GJ-04 - Bhavnagar',
      value: 'GJ-04',
    },
    {
      label: 'GJ-05 - Surat city',
      value: 'GJ-05',
    },
    {
      label: 'GJ-06 - Vadodara city',
      value: 'GJ-06',
    },
    {
      label: 'GJ-07 - Nadiad',
      value: 'GJ-07',
    },
    {
      label: 'GJ-08 - Palanpur',
      value: 'GJ-08',
    },
    {
      label: 'GJ-09 - Himmatnagar',
      value: 'GJ-09',
    },
    {
      label: 'GJ-10 - Jamnagar',
      value: 'GJ-10',
    },
    {
      label: 'GJ-11 - Junagadh',
      value: 'GJ-11',
    },
    {
      label: 'GJ-12 - Bhuj',
      value: 'GJ-12',
    },
    {
      label: 'GJ-13 - Surendranagar',
      value: 'GJ-13',
    },
    {
      label: 'GJ-14 - Rajula',
      value: 'GJ-14',
    },
    {
      label: 'GJ-15 - Valsad',
      value: 'GJ-15',
    },
    {
      label: 'GJ-16 - Bharuch',
      value: 'GJ-16',
    },
    {
      label: 'GJ-17 - Godhra',
      value: 'GJ-17',
    },
    {
      label: 'GJ-18 - Gandhinagar',
      value: 'GJ-18',
    },
    {
      label: 'GJ-19 - Bardoli',
      value: 'GJ-19',
    },
    {
      label: 'GJ-20 - Dahod',
      value: 'GJ-20',
    },
    {
      label: 'GJ-21 - Navsari',
      value: 'GJ-21',
    },
    {
      label: 'GJ-22 - Rajpipla',
      value: 'GJ-22',
    },
    {
      label: 'GJ-23 - Anand',
      value: 'GJ-23',
    },
    {
      label: 'GJ-24 - Patan',
      value: 'GJ-24',
    },
    {
      label: 'GJ-25 - Porbandar',
      value: 'GJ-25',
    },
    {
      label: 'GJ-26 - Vyara',
      value: 'GJ-26',
    },
    {
      label: 'GJ-27 - Ahmedabad(East), Vastral',
      value: 'GJ-27',
    },
    {
      label: 'GJ-28 - Surat rural',
      value: 'GJ-28',
    },
    {
      label: 'GJ-29 - Vadodara rural',
      value: 'GJ-29',
    },
    {
      label: 'GJ-30 - Waghai',
      value: 'GJ-30',
    },
    {
      label: 'GJ-31 - Modasa',
      value: 'GJ-31',
    },
    {
      label: 'GJ-32 - Veraval',
      value: 'GJ-32',
    },
    {
      label: 'GJ-33 - Botad',
      value: 'GJ-33',
    },
    {
      label: 'GJ-34 - Chhota Udaipur',
      value: 'GJ-34',
    },
    {
      label: 'GJ-35 - Lunawada',
      value: 'GJ-35',
    },
    {
      label: 'GJ-36 - Morbi',
      value: 'GJ-36',
    },
    {
      label: 'GJ-37 - Khambhaliya',
      value: 'GJ-37',
    },
    {
      label: 'GJ-38 - Bavla',
      value: 'GJ-38',
    },
  ],
  HR: [
    {
      label: 'HR-01 - Ambala',
      value: 'HR-01',
    },
    {
      label: 'HR-02 - Jagadhri',
      value: 'HR-02',
    },
    {
      label: 'HR-03 - Panchkula',
      value: 'HR-03',
    },
    {
      label: 'HR-04 - Naraingarh',
      value: 'HR-04',
    },
    {
      label: 'HR-05 - Karnal',
      value: 'HR-05',
    },
    {
      label: 'HR-06 - Panipat',
      value: 'HR-06',
    },
    {
      label: 'HR-07 - Thanesar',
      value: 'HR-07',
    },
    {
      label: 'HR-08 - Kaithal',
      value: 'HR-08',
    },
    {
      label: 'HR-09 - Guhla',
      value: 'HR-09',
    },
    {
      label: 'HR-10 - Sonipat',
      value: 'HR-10',
    },
    {
      label: 'HR-11 - Gohana',
      value: 'HR-11',
    },
    {
      label: 'HR-12 - Rohtak',
      value: 'HR-12',
    },
    {
      label: 'HR-13 - Bahadurgarh',
      value: 'HR-13',
    },
    {
      label: 'HR-14 - Jhajjar',
      value: 'HR-14',
    },
    {
      label: 'HR-15 - Meham',
      value: 'HR-15',
    },
    {
      label: 'HR-16 - Bhiwani',
      value: 'HR-16',
    },
    {
      label: 'HR-17 - Siwani',
      value: 'HR-17',
    },
    {
      label: 'HR-18 - Loharu',
      value: 'HR-18',
    },
    {
      label: 'HR-19 - Charkhi Dadri',
      value: 'HR-19',
    },
    {
      label: 'HR-20 - Hisar',
      value: 'HR-20',
    },
    {
      label: 'HR-21 - Hansi',
      value: 'HR-21',
    },
    {
      label: 'HR-22 - Fatehabad',
      value: 'HR-22',
    },
    {
      label: 'HR-23 - Tohana',
      value: 'HR-23',
    },
    {
      label: 'HR-24 - Sirsa',
      value: 'HR-24',
    },
    {
      label: 'HR-25 - Mandi Dabwali',
      value: 'HR-25',
    },
    {
      label: 'HR-26 - Gurgaon',
      value: 'HR-26',
    },
    {
      label: 'HR-27 - Nuh',
      value: 'HR-27',
    },
    {
      label: 'HR-28 - Ferozepur Jhirka',
      value: 'HR-28',
    },
    {
      label: 'HR-29 - Ballabgarh',
      value: 'HR-29',
    },
    {
      label: 'HR-30 - Palwal',
      value: 'HR-30',
    },
    {
      label: 'HR-31 - Jind',
      value: 'HR-31',
    },
    {
      label: 'HR-32 - Narwana',
      value: 'HR-32',
    },
    {
      label: 'HR-33 - Safidon',
      value: 'HR-33',
    },
    {
      label: 'HR-34 - Mahendragarh',
      value: 'HR-34',
    },
    {
      label: 'HR-35 - Narnaul',
      value: 'HR-35',
    },
    {
      label: 'HR-36 - Rewari',
      value: 'HR-36',
    },
    {
      label: 'HR-37 - Ambala',
      value: 'HR-37',
    },
    {
      label: 'HR-38 - Faridabad',
      value: 'HR-38',
    },
    {
      label: 'HR-39 - Hisar',
      value: 'HR-39',
    },
    {
      label: 'HR-40 - Assandh',
      value: 'HR-40',
    },
    {
      label: 'HR-41 - Pehowa',
      value: 'HR-41',
    },
    {
      label: 'HR-42 - Ganaur',
      value: 'HR-42',
    },
    {
      label: 'HR-43 - Kosli',
      value: 'HR-43',
    },
    {
      label: 'HR-44 - Ellenabad',
      value: 'HR-44',
    },
    {
      label: 'HR-45 - Karnal',
      value: 'HR-45',
    },
    {
      label: 'HR-46 - Rohtak',
      value: 'HR-46',
    },
    {
      label: 'HR-47 - Rewari',
      value: 'HR-47',
    },
    {
      label: 'HR-48 - Tosham',
      value: 'HR-48',
    },
    {
      label: 'HR-49 - Kalka',
      value: 'HR-49',
    },
    {
      label: 'HR-50 - Hodal',
      value: 'HR-50',
    },
    {
      label: 'HR-51 - Faridabad',
      value: 'HR-51',
    },
    {
      label: 'HR-52 - Hathin',
      value: 'HR-52',
    },
    {
      label: 'HR-53 - Adampur',
      value: 'HR-53',
    },
    {
      label: 'HR-54 - Barara',
      value: 'HR-54',
    },
    {
      label: 'HR-55 - Gurgaon',
      value: 'HR-55',
    },
    {
      label: 'HR-56 - Jind',
      value: 'HR-56',
    },
    {
      label: 'HR-57 - Sirsa',
      value: 'HR-57',
    },
    {
      label: 'HR-58 - Jagadhri',
      value: 'HR-58',
    },
    {
      label: 'HR-59 - Ratia',
      value: 'HR-59',
    },
    {
      label: 'HR-60 - Samalkha',
      value: 'HR-60',
    },
    {
      label: 'HR-61 - Bhiwani',
      value: 'HR-61',
    },
    {
      label: 'HR-62 - Fatehabad',
      value: 'HR-62',
    },
    {
      label: 'HR-63 - Jhajjar',
      value: 'HR-63',
    },
    {
      label: 'HR-64 - Kaithal',
      value: 'HR-64',
    },
    {
      label: 'HR-65 - Thanesar',
      value: 'HR-65',
    },
    {
      label: 'HR-66 - Narnaul',
      value: 'HR-66',
    },
    {
      label: 'HR-67 - Panipat',
      value: 'HR-67',
    },
    {
      label: 'HR-68 - Panchkula',
      value: 'HR-68',
    },
    {
      label: 'HR-69 - Sonipat',
      value: 'HR-69',
    },
    {
      label: 'HR-70 - Chandigarh',
      value: 'HR-70',
    },
    {
      label: 'HR-71 - Bilaspur',
      value: 'HR-71',
    },
    {
      label: 'HR-72 - Gurgaon',
      value: 'HR-72',
    },
    {
      label: 'HR-73 - Palwal',
      value: 'HR-73',
    },
    {
      label: 'HR-74 - Nuh',
      value: 'HR-74',
    },
    {
      label: 'HR-75 - Indri',
      value: 'HR-75',
    },
    {
      label: 'HR-76 - Pataudi',
      value: 'HR-76',
    },
    {
      label: 'HR-77 - Beri',
      value: 'HR-77',
    },
    {
      label: 'HR-78 - Shahabad Markanda',
      value: 'HR-78',
    },
    {
      label: 'HR-79 - Kharkhoda',
      value: 'HR-79',
    },
    {
      label: 'HR-80 - Barwala',
      value: 'HR-80',
    },
    {
      label: 'HR-81 - Bawal',
      value: 'HR-81',
    },
    {
      label: 'HR-83 - Kalayat',
      value: 'HR-83',
    },
    {
      label: 'HR-85 - CANTT',
      value: 'HR-85',
    },
    {
      label: 'HR-86 - Sonipat',
      value: 'HR-86',
    },
    {
      label: 'HR-88 - Kundli',
      value: 'HR-88',
    },
  ],
  HP: [
    {
      label: 'HP-01 - Statewide',
      value: 'HP-01',
    },
    {
      label: 'HP-02 - Statewide',
      value: 'HP-02',
    },
    {
      label: 'HP-03 - Shimla - Urban',
      value: 'HP-03',
    },
    {
      label: 'HP-04 - Dharamsala',
      value: 'HP-04',
    },
    {
      label: 'HP-05 - Mandi',
      value: 'HP-05',
    },
    {
      label: 'HP-06 - Rampur',
      value: 'HP-06',
    },
    {
      label: 'HP-07 - Shimla',
      value: 'HP-07',
    },
    {
      label: 'HP-08 - Chaupal',
      value: 'HP-08',
    },
    {
      label: 'HP-09 - Theog',
      value: 'HP-09',
    },
    {
      label: 'HP-10 - Rohru',
      value: 'HP-10',
    },
    {
      label: 'HP-11 - Arki',
      value: 'HP-11',
    },
    {
      label: 'HP-12 - Nalagarh',
      value: 'HP-12',
    },
    {
      label: 'HP-13 - Kandaghat',
      value: 'HP-13',
    },
    {
      label: 'HP-14 - Solan',
      value: 'HP-14',
    },
    {
      label: 'HP-15 - Parwanoo',
      value: 'HP-15',
    },
    {
      label: 'HP-16 - Rajgarh',
      value: 'HP-16',
    },
    {
      label: 'HP-17 - Paonta Sahib',
      value: 'HP-17',
    },
    {
      label: 'HP-18 - Nahan',
      value: 'HP-18',
    },
    {
      label: 'HP-19 - Amb',
      value: 'HP-19',
    },
    {
      label: 'HP-20 - Una',
      value: 'HP-20',
    },
    {
      label: 'HP-21 - Barsar, Hamirpur',
      value: 'HP-21',
    },
    {
      label: 'HP-22 - Hamirpur',
      value: 'HP-22',
    },
    {
      label: 'HP-23 - Ghumarwin',
      value: 'HP-23',
    },
    {
      label: 'HP-24 - Bilaspur',
      value: 'HP-24',
    },
    {
      label: 'HP-25 - Reckong Peo',
      value: 'HP-25',
    },
    {
      label: 'HP-26 - Nichar',
      value: 'HP-26',
    },
    {
      label: 'HP-27 - Poo',
      value: 'HP-27',
    },
    {
      label: 'HP-28 - Sarkaghat',
      value: 'HP-28',
    },
    {
      label: 'HP-29 - Jogindernagar',
      value: 'HP-29',
    },
    {
      label: 'HP-30 - Karsog',
      value: 'HP-30',
    },
    {
      label: 'HP-31 - Sundernagar',
      value: 'HP-31',
    },
    {
      label: 'HP-32 - Gohar, Mandi',
      value: 'HP-32',
    },
    {
      label: 'HP-33 - Mandi',
      value: 'HP-33',
    },
    {
      label: 'HP-34 - Kullu',
      value: 'HP-34',
    },
    {
      label: 'HP-35 - Anni, Kullu',
      value: 'HP-35',
    },
    {
      label: 'HP-36 - Dehra',
      value: 'HP-36',
    },
    {
      label: 'HP-37 - Palampur',
      value: 'HP-37',
    },
    {
      label: 'HP-38 - Nurpur',
      value: 'HP-38',
    },
    {
      label: 'HP-39 - Dharamshala',
      value: 'HP-39',
    },
    {
      label: 'HP-40 - Kangra',
      value: 'HP-40',
    },
    {
      label: 'HP-41 - Kaza',
      value: 'HP-41',
    },
    {
      label: 'HP-42 - Keylong',
      value: 'HP-42',
    },
    {
      label: 'HP-43 - Udaipur',
      value: 'HP-43',
    },
    {
      label: 'HP-44 - Churah',
      value: 'HP-44',
    },
    {
      label: 'HP-45 - Pangi',
      value: 'HP-45',
    },
    {
      label: 'HP-46 - Bharmour',
      value: 'HP-46',
    },
    {
      label: 'HP-47 - Dalhousie',
      value: 'HP-47',
    },
    {
      label: 'HP-48 - Chamba',
      value: 'HP-48',
    },
    {
      label: 'HP-49 - Banjar',
      value: 'HP-49',
    },
    {
      label: 'HP-50 - Shimla',
      value: 'HP-50',
    },
    {
      label: 'HP-51 - Shimla',
      value: 'HP-51',
    },
    {
      label: 'HP-52 - Shimla',
      value: 'HP-52',
    },
    {
      label: 'HP-53 - Baijnath',
      value: 'HP-53',
    },
    {
      label: 'HP-54 - Jawali',
      value: 'HP-54',
    },
    {
      label: 'HP-55 - Nadaun / Hamirpur',
      value: 'HP-55',
    },
    {
      label: 'HP-56 - Jaisinghpur',
      value: 'HP-56',
    },
    {
      label: 'HP-57 - Chowari',
      value: 'HP-57',
    },
    {
      label: 'HP-58 - Manali',
      value: 'HP-58',
    },
    {
      label: 'HP-59 - Solan',
      value: 'HP-59',
    },
    {
      label: 'HP-60 - Hamirpur',
      value: 'HP-60',
    },
    {
      label: 'HP-61 - Kullu',
      value: 'HP-61',
    },
    {
      label: 'HP-62 - Shimla',
      value: 'HP-62',
    },
    {
      label: 'HP-63 - Shimla',
      value: 'HP-63',
    },
    {
      label: 'HP-64 - Solan',
      value: 'HP-64',
    },
    {
      label: 'HP-65 - Mandi',
      value: 'HP-65',
    },
    {
      label: 'HP-66 - Kullu',
      value: 'HP-66',
    },
    {
      label: 'HP-67 - Hamirpur',
      value: 'HP-67',
    },
    {
      label: 'HP-68 - Dharmsala',
      value: 'HP-68',
    },
    {
      label: 'HP-69 - Bilaspur',
      value: 'HP-69',
    },
    {
      label: 'HP-70 - Bilaspur',
      value: 'HP-70',
    },
    {
      label: 'HP-71 - Nahan',
      value: 'HP-71',
    },
    {
      label: 'HP-72 - Una',
      value: 'HP-72',
    },
    {
      label: 'HP-73 - Chamba',
      value: 'HP-73',
    },
    {
      label: 'HP-74 - Bhoranj, Hamirpur',
      value: 'HP-74',
    },
    {
      label: 'HP-76 - Paddhar, Mandi',
      value: 'HP-76',
    },
    {
      label: 'HP-77 - Dodra Kawar, Shimla',
      value: 'HP-77',
    },
    {
      label: 'HP-78 - Bangana, Una',
      value: 'HP-78',
    },
    {
      label: 'HP-79 - Sangrah, Sirmaur',
      value: 'HP-79',
    },
    {
      label: 'HP-80 - Haroli, Una',
      value: 'HP-80',
    },
    {
      label: 'HP-81 - Salooni (Dist. Chamba)',
      value: 'HP-81',
    },
    {
      label: 'HP-82 - Mandi (rural)',
      value: 'HP-82',
    },
    {
      label: 'HP-83 - Jawalaji, Kangra',
      value: 'HP-83',
    },
    {
      label: 'HP-84 - Sujanpur Tihra, Hamirpur',
      value: 'HP-84',
    },
    {
      label: 'HP-85 - Shillai, Sirmaur',
      value: 'HP-85',
    },
    {
      label: 'HP-86 - Dharampur Distt Mandi',
      value: 'HP-86',
    },
  ],
  JH: [
    {
      label: 'JH-01 - Ranchi / Khunti',
      value: 'JH-01',
    },
    {
      label: 'JH-02 - Hazaribagh / Ramgarh',
      value: 'JH-02',
    },
    {
      label: 'JH-03 - Daltonganj',
      value: 'JH-03',
    },
    {
      label: 'JH-04 - Dumka',
      value: 'JH-04',
    },
    {
      label: 'JH-05 - Jamshedpur',
      value: 'JH-05',
    },
    {
      label: 'JH-06 - Chaibasa',
      value: 'JH-06',
    },
    {
      label: 'JH-07 - Gumla',
      value: 'JH-07',
    },
    {
      label: 'JH-08 - Lohardaga',
      value: 'JH-08',
    },
    {
      label: 'JH-09 - Bokaro',
      value: 'JH-09',
    },
    {
      label: 'JH-10 - Dhanbad',
      value: 'JH-10',
    },
    {
      label: 'JH-11 - Giridih',
      value: 'JH-11',
    },
    {
      label: 'JH-12 - Koderma',
      value: 'JH-12',
    },
    {
      label: 'JH-13 - Chatra',
      value: 'JH-13',
    },
    {
      label: 'JH-14 - Garhwa',
      value: 'JH-14',
    },
    {
      label: 'JH-15 - Deoghar',
      value: 'JH-15',
    },
    {
      label: 'JH-16 - Pakur',
      value: 'JH-16',
    },
    {
      label: 'JH-17 - Godda',
      value: 'JH-17',
    },
    {
      label: 'JH-18 - Sahibganj',
      value: 'JH-18',
    },
    {
      label: 'JH-19 - Latehar',
      value: 'JH-19',
    },
    {
      label: 'JH-20 - Simdega',
      value: 'JH-20',
    },
    {
      label: 'JH-21 - Jamtara',
      value: 'JH-21',
    },
    {
      label: 'JH-22 - Saraikela-khrshawan',
      value: 'JH-22',
    },
    {
      label: 'JH-23 - Khunti',
      value: 'JH-23',
    },
    {
      label: 'JH-24 - Ramgarh',
      value: 'JH-24',
    },
  ],
  KA: [
    {
      label: 'KA-01 - Bengaluru Central, Koramangala',
      value: 'KA-01',
    },
    {
      label: 'KA-02 - Bengaluru West, Rajajinagar',
      value: 'KA-02',
    },
    {
      label: 'KA-03 - Bengaluru East, Indiranagar',
      value: 'KA-03',
    },
    {
      label: 'KA-04 - Bengaluru North, Yeshwanthpur',
      value: 'KA-04',
    },
    {
      label: 'KA-05 - Bengaluru South, Jayanagar',
      value: 'KA-05',
    },
    {
      label: 'KA-06 - Tumakuru',
      value: 'KA-06',
    },
    {
      label: 'KA-07 - Kolar',
      value: 'KA-07',
    },
    {
      label: 'KA-08 - Kolar Gold Fields',
      value: 'KA-08',
    },
    {
      label: 'KA-09 - Mysuru West',
      value: 'KA-09',
    },
    {
      label: 'KA-10 - Chamarajanagar',
      value: 'KA-10',
    },
    {
      label: 'KA-11 - Mandya',
      value: 'KA-11',
    },
    {
      label: 'KA-12 - Madikeri',
      value: 'KA-12',
    },
    {
      label: 'KA-13 - Hassan',
      value: 'KA-13',
    },
    {
      label: 'KA-14 - Shivamogga',
      value: 'KA-14',
    },
    {
      label: 'KA-15 - Sagara',
      value: 'KA-15',
    },
    {
      label: 'KA-16 - Chitradurga',
      value: 'KA-16',
    },
    {
      label: 'KA-17 - Davangere',
      value: 'KA-17',
    },
    {
      label: 'KA-18 - Chikkamagaluru',
      value: 'KA-18',
    },
    {
      label: 'KA-19 - Mangaluru',
      value: 'KA-19',
    },
    {
      label: 'KA-20 - Udupi',
      value: 'KA-20',
    },
    {
      label: 'KA-21 - Puttur',
      value: 'KA-21',
    },
    {
      label: 'KA-22 - Belagavi',
      value: 'KA-22',
    },
    {
      label: 'KA-23 - Chikkodi',
      value: 'KA-23',
    },
    {
      label: 'KA-24 - Bailhongal',
      value: 'KA-24',
    },
    {
      label: 'KA-25 - Dharwad',
      value: 'KA-25',
    },
    {
      label: 'KA-26 - Gadag',
      value: 'KA-26',
    },
    {
      label: 'KA-27 - Haveri',
      value: 'KA-27',
    },
    {
      label: 'KA-28 - Bijapur',
      value: 'KA-28',
    },
    {
      label: 'KA-29 - Bagalkote',
      value: 'KA-29',
    },
    {
      label: 'KA-30 - Karwar',
      value: 'KA-30',
    },
    {
      label: 'KA-31 - Sirsi',
      value: 'KA-31',
    },
    {
      label: 'KA-32 - Gulbarga s',
      value: 'KA-32',
    },
    {
      label: 'KA-33 - Yadgir',
      value: 'KA-33',
    },
    {
      label: 'KA-34 - Ballari',
      value: 'KA-34',
    },
    {
      label: 'KA-35 - Hospet',
      value: 'KA-35',
    },
    {
      label: 'KA-36 - Raichur',
      value: 'KA-36',
    },
    {
      label: 'KA-37 - Koppal',
      value: 'KA-37',
    },
    {
      label: 'KA-38 - Bidar',
      value: 'KA-38',
    },
    {
      label: 'KA-39 - Bhalki',
      value: 'KA-39',
    },
    {
      label: 'KA-40 - Chikkaballapur',
      value: 'KA-40',
    },
    {
      label: 'KA-41 - Bengaluru Western Suburbs',
      value: 'KA-41',
    },
    {
      label: 'KA-42 - Ramanagaram',
      value: 'KA-42',
    },
    {
      label: 'KA-43 - Devanahalli',
      value: 'KA-43',
    },
    {
      label: 'KA-44 - Tiptur',
      value: 'KA-44',
    },
    {
      label: 'KA-45 - Hunsur',
      value: 'KA-45',
    },
    {
      label: 'KA-46 - Sakleshpur',
      value: 'KA-46',
    },
    {
      label: 'KA-47 - Honnavar',
      value: 'KA-47',
    },
    {
      label: 'KA-48 - Jamkhandi',
      value: 'KA-48',
    },
    {
      label: 'KA-49 - Gokak',
      value: 'KA-49',
    },
    {
      label: 'KA-50 - Bengaluru Northern Suburbs: Yelahanka',
      value: 'KA-50',
    },
    {
      label: 'KA-51 - Bengaluru Southern Suburbs: Electronics City',
      value: 'KA-51',
    },
    {
      label: 'KA-52 - Nelamangala, Bengaluru Rural District',
      value: 'KA-52',
    },
    {
      label: 'KA-53 - Bengaluru Eastern Suburbs: Krishnarajapuram',
      value: 'KA-53',
    },
    {
      label: 'KA-54 - Nagamangala',
      value: 'KA-54',
    },
    {
      label: 'KA-55 - Mysuru East',
      value: 'KA-55',
    },
    {
      label: 'KA-56 - Basavakalyan',
      value: 'KA-56',
    },
    {
      label: 'KA-57 - Shantinagar, Bengaluru Urban District',
      value: 'KA-57',
    },
    {
      label: 'KA-61 - Marathahalli, Bengaluru Urban District',
      value: 'KA-61',
    },
    {
      label: 'KA-62 - Surathkal, Mangaluru',
      value: 'KA-62',
    },
    {
      label: 'KA-63 - Hubli',
      value: 'KA-63',
    },
    {
      label: 'KA-64 - Madhugiri',
      value: 'KA-64',
    },
    {
      label: 'KA-65 - Dandeli',
      value: 'KA-65',
    },
    {
      label: 'KA-66 - Tarikere',
      value: 'KA-66',
    },
    {
      label: 'KA-67 - Sedam',
      value: 'KA-67',
    },
    {
      label: 'KA-68 - Chintamani',
      value: 'KA-68',
    },
    {
      label: 'KA-69 - Ranebennuru',
      value: 'KA-69',
    },
    {
      label: 'KA-70 - Bantwal',
      value: 'KA-70',
    },
  ],
  KL: [
    {
      label: 'KL-01 - Thiruvananthapuram',
      value: 'KL-01',
    },
    {
      label: 'KL-02 - Kollam',
      value: 'KL-02',
    },
    {
      label: 'KL-03 - Pathanamthitta',
      value: 'KL-03',
    },
    {
      label: 'KL-04 - Alappuzha',
      value: 'KL-04',
    },
    {
      label: 'KL-05 - Kottayam',
      value: 'KL-05',
    },
    {
      label: 'KL-06 - Idukki',
      value: 'KL-06',
    },
    {
      label: 'KL-07 - Ernakulam',
      value: 'KL-07',
    },
    {
      label: 'KL-08 - Thrissur',
      value: 'KL-08',
    },
    {
      label: 'KL-09 - Palakkad',
      value: 'KL-09',
    },
    {
      label: 'KL-10 - Malappuram',
      value: 'KL-10',
    },
    {
      label: 'KL-11 - Kozhikode',
      value: 'KL-11',
    },
    {
      label: 'KL-12 - Wayanad',
      value: 'KL-12',
    },
    {
      label: 'KL-13 - Kannur',
      value: 'KL-13',
    },
    {
      label: 'KL-14 - Kasargod',
      value: 'KL-14',
    },
    {
      label: 'KL-15 - Kerala State Road Transport Corporation buses',
      value: 'KL-15',
    },
    {
      label: 'KL-16 - Attingal',
      value: 'KL-16',
    },
    {
      label: 'KL-17 - Muvattupuzha',
      value: 'KL-17',
    },
    {
      label: 'KL-18 - Vatakara',
      value: 'KL-18',
    },
    {
      label: 'KL-19 - Parassala',
      value: 'KL-19',
    },
    {
      label: 'KL-20 - Neyyattinkara',
      value: 'KL-20',
    },
    {
      label: 'KL-21 - Nedumangad',
      value: 'KL-21',
    },
    {
      label: 'KL-22 - Kazhakkoottam / Thiruvananthapuram',
      value: 'KL-22',
    },
    {
      label: 'KL-23 - Karunagapally',
      value: 'KL-23',
    },
    {
      label: 'KL-24 - Kottarakara',
      value: 'KL-24',
    },
    {
      label: 'KL-25 - Punalur',
      value: 'KL-25',
    },
    {
      label: 'KL-26 - Adoor',
      value: 'KL-26',
    },
    {
      label: 'KL-27 - Thiruvalla',
      value: 'KL-27',
    },
    {
      label: 'KL-28 - Mallappally',
      value: 'KL-28',
    },
    {
      label: 'KL-29 - Kayamkulam',
      value: 'KL-29',
    },
    {
      label: 'KL-30 - Chengannur',
      value: 'KL-30',
    },
    {
      label: 'KL-31 - Mavelikara',
      value: 'KL-31',
    },
    {
      label: 'KL-32 - Cherthala',
      value: 'KL-32',
    },
    {
      label: 'KL-33 - Changanassery',
      value: 'KL-33',
    },
    {
      label: 'KL-34 - Kanjirappally',
      value: 'KL-34',
    },
    {
      label: 'KL-35 - Pala',
      value: 'KL-35',
    },
    {
      label: 'KL-36 - Vaikom',
      value: 'KL-36',
    },
    {
      label: 'KL-37 - Vandiperiyar',
      value: 'KL-37',
    },
    {
      label: 'KL-38 - Thodupuzha',
      value: 'KL-38',
    },
    {
      label: 'KL-39 - Thripunithura',
      value: 'KL-39',
    },
    {
      label: 'KL-40 - Perumbavoor',
      value: 'KL-40',
    },
    {
      label: 'KL-41 - Aluva',
      value: 'KL-41',
    },
    {
      label: 'KL-42 - North Paravur',
      value: 'KL-42',
    },
    {
      label: 'KL-43 - Mattancherry',
      value: 'KL-43',
    },
    {
      label: 'KL-44 - Kothamangalam',
      value: 'KL-44',
    },
    {
      label: 'KL-45 - Irinjalakuda',
      value: 'KL-45',
    },
    {
      label: 'KL-46 - Guruvayur',
      value: 'KL-46',
    },
    {
      label: 'KL-47 - Kodungallur',
      value: 'KL-47',
    },
    {
      label: 'KL-48 - Wadakkancherry',
      value: 'KL-48',
    },
    {
      label: 'KL-49 - Alathur',
      value: 'KL-49',
    },
    {
      label: 'KL-50 - Mannarghat',
      value: 'KL-50',
    },
    {
      label: 'KL-51 - Ottappalam',
      value: 'KL-51',
    },
    {
      label: 'KL-52 - Pattambi',
      value: 'KL-52',
    },
    {
      label: 'KL-53 - Perinthalmanna',
      value: 'KL-53',
    },
    {
      label: 'KL-54 - Ponnani',
      value: 'KL-54',
    },
    {
      label: 'KL-55 - Tirur',
      value: 'KL-55',
    },
    {
      label: 'KL-56 - Koyilandy',
      value: 'KL-56',
    },
    {
      label: 'KL-57 - Koduvally',
      value: 'KL-57',
    },
    {
      label: 'KL-58 - Thalassery',
      value: 'KL-58',
    },
    {
      label: 'KL-59 - Thaliparamba',
      value: 'KL-59',
    },
    {
      label: 'KL-60 - Kanhangad',
      value: 'KL-60',
    },
    {
      label: 'KL-61 - Kunnathur',
      value: 'KL-61',
    },
    {
      label: 'KL-62 - Ranni',
      value: 'KL-62',
    },
    {
      label: 'KL-63 - Angamaly',
      value: 'KL-63',
    },
    {
      label: 'KL-64 - Chalakkudy',
      value: 'KL-64',
    },
    {
      label: 'KL-65 - Thirurangadi',
      value: 'KL-65',
    },
    {
      label: 'KL-66 - Kuttanadu',
      value: 'KL-66',
    },
    {
      label: 'KL-67 - Uzhavoor',
      value: 'KL-67',
    },
    {
      label: 'KL-68 - Devikulam',
      value: 'KL-68',
    },
    {
      label: 'KL-69 - Nedumkandam',
      value: 'KL-69',
    },
    {
      label: 'KL-70 - Chittur',
      value: 'KL-70',
    },
    {
      label: 'KL-71 - Nilambur',
      value: 'KL-71',
    },
    {
      label: 'KL-72 - Mananthavady',
      value: 'KL-72',
    },
    {
      label: 'KL-73 - Sulthan Bathery',
      value: 'KL-73',
    },
  ],
  MP: [
    {
      label: 'MP-01 - State Governors Vehicle',
      value: 'MP-01',
    },
    {
      label: 'MP-02 - MP Government Vehicles',
      value: 'MP-02',
    },
    {
      label: 'MP-03 - MP Police Vehicle',
      value: 'MP-03',
    },
    {
      label: 'MP-04 - Bhopal',
      value: 'MP-04',
    },
    {
      label: 'MP-05 - Hoshangabad',
      value: 'MP-05',
    },
    {
      label: 'MP-06 - Morena',
      value: 'MP-06',
    },
    {
      label: 'MP-07 - Gwalior',
      value: 'MP-07',
    },
    {
      label: 'MP-08 - Guna',
      value: 'MP-08',
    },
    {
      label: 'MP-09 - Indore',
      value: 'MP-09',
    },
    {
      label: 'MP-10 - Kahrgone (west Nimar)',
      value: 'MP-10',
    },
    {
      label: 'MP-11 - Dhar',
      value: 'MP-11',
    },
    {
      label: 'MP-12 - Khandwa (East Nimar)',
      value: 'MP-12',
    },
    {
      label: 'MP-13 - Ujjain',
      value: 'MP-13',
    },
    {
      label: 'MP-14 - Mandsaur',
      value: 'MP-14',
    },
    {
      label: 'MP-15 - Sagar',
      value: 'MP-15',
    },
    {
      label: 'MP-16 - Chhatarpur',
      value: 'MP-16',
    },
    {
      label: 'MP-17 - Rewa',
      value: 'MP-17',
    },
    {
      label: 'MP-18 - Shahdol',
      value: 'MP-18',
    },
    {
      label: 'MP-19 - Satna',
      value: 'MP-19',
    },
    {
      label: 'MP-20 - Jabalpur',
      value: 'MP-20',
    },
    {
      label: 'MP-21 - Katni',
      value: 'MP-21',
    },
    {
      label: 'MP-22 - Seoni',
      value: 'MP-22',
    },
    {
      label: 'MP-23 - Raipur',
      value: 'MP-23',
    },
    {
      label: 'MP-24 - Durg',
      value: 'MP-24',
    },
    {
      label: 'MP-25 - Jagdalpur (not in use)',
      value: 'MP-25',
    },
    {
      label: 'MP-26 - Bilaspur (not in use)',
      value: 'MP-26',
    },
    {
      label: 'MP-27 - Ambikapur (not in use)',
      value: 'MP-27',
    },
    {
      label: 'MP-28 - Chhindwara',
      value: 'MP-28',
    },
    {
      label: 'MP-29 - Rajnandgaon(not in use)',
      value: 'MP-29',
    },
    {
      label: 'MP-30 - Bhind',
      value: 'MP-30',
    },
    {
      label: 'MP-31 - Sheopur',
      value: 'MP-31',
    },
    {
      label: 'MP-32 - Datia',
      value: 'MP-32',
    },
    {
      label: 'MP-33 - Shivpuri',
      value: 'MP-33',
    },
    {
      label: 'MP-34 - Damoh',
      value: 'MP-34',
    },
    {
      label: 'MP-35 - Panna',
      value: 'MP-35',
    },
    {
      label: 'MP-36 - Tikamgarh',
      value: 'MP-36',
    },
    {
      label: 'MP-37 - Sehore',
      value: 'MP-37',
    },
    {
      label: 'MP-38 - Raisen',
      value: 'MP-38',
    },
    {
      label: 'MP-39 - Rajgarh',
      value: 'MP-39',
    },
    {
      label: 'MP-40 - Vidisha',
      value: 'MP-40',
    },
    {
      label: 'MP-41 - Dewas',
      value: 'MP-41',
    },
    {
      label: 'MP-42 - Shajapur',
      value: 'MP-42',
    },
    {
      label: 'MP-43 - Ratlam',
      value: 'MP-43',
    },
    {
      label: 'MP-44 - Neemuch',
      value: 'MP-44',
    },
    {
      label: 'MP-45 - Jhabua',
      value: 'MP-45',
    },
    {
      label: 'MP-46 - Badwani',
      value: 'MP-46',
    },
    {
      label: 'MP-47 - Harda',
      value: 'MP-47',
    },
    {
      label: 'MP-48 - Betul',
      value: 'MP-48',
    },
    {
      label: 'MP-49 - Narsinghpur',
      value: 'MP-49',
    },
    {
      label: 'MP-50 - Balaghat',
      value: 'MP-50',
    },
    {
      label: 'MP-51 - Mandla',
      value: 'MP-51',
    },
    {
      label: 'MP-52 - Dindori',
      value: 'MP-52',
    },
    {
      label: 'MP-53 - Sidhi',
      value: 'MP-53',
    },
    {
      label: 'MP-54 - Umaria',
      value: 'MP-54',
    },
    {
      label: 'MP-65 - Anuppur',
      value: 'MP-65',
    },
    {
      label: 'MP-66 - Singrauli (Waidhan)',
      value: 'MP-66',
    },
    {
      label: 'MP-67 - Ashoknagar',
      value: 'MP-67',
    },
    {
      label: 'MP-68 - Burhanpur',
      value: 'MP-68',
    },
    {
      label: 'MP-69 - Alirajpur',
      value: 'MP-69',
    },
    {
      label: 'MP-70 - Agar / Malwa',
      value: 'MP-70',
    },
  ],
  MH: [
    {
      label: 'MH-01 - Mumbai (South)',
      value: 'MH-01',
    },
    {
      label: 'MH-02 - Mumbai (West)',
      value: 'MH-02',
    },
    {
      label: 'MH-03 - Mumbai (East)',
      value: 'MH-03',
    },
    {
      label: 'MH-04 - Thane.',
      value: 'MH-04',
    },
    {
      label: 'MH-05 - Kalyan-Dombivali, Ulhasnagar',
      value: 'MH-05',
    },
    {
      label: 'MH-06 - Raigad',
      value: 'MH-06',
    },
    {
      label: 'MH-07 - Sindhudurg',
      value: 'MH-07',
    },
    {
      label: 'MH-08 - Ratnagiri',
      value: 'MH-08',
    },
    {
      label: 'MH-09 - Kolhapur',
      value: 'MH-09',
    },
    {
      label: 'MH-10 - Sangli-Miraj-Kupwad',
      value: 'MH-10',
    },
    {
      label: 'MH-11 - Satara',
      value: 'MH-11',
    },
    {
      label: 'MH-12 - Pune',
      value: 'MH-12',
    },
    {
      label: 'MH-13 - Solapur',
      value: 'MH-13',
    },
    {
      label: 'MH-14 - Pimpri-Chinchwad',
      value: 'MH-14',
    },
    {
      label: 'MH-15 - Nashik',
      value: 'MH-15',
    },
    {
      label: 'MH-16 - Ahmednagar District (South)',
      value: 'MH-16',
    },
    {
      label: 'MH-17 - Ahmednagar District (North)',
      value: 'MH-17',
    },
    {
      label: 'MH-18 - Dhule',
      value: 'MH-18',
    },
    {
      label: 'MH-19 - Jalgaon',
      value: 'MH-19',
    },
    {
      label: 'MH-20 - Aurangabad',
      value: 'MH-20',
    },
    {
      label: 'MH-21 - Jalna',
      value: 'MH-21',
    },
    {
      label: 'MH-22 - Parbhani',
      value: 'MH-22',
    },
    {
      label: 'MH-23 - Beed',
      value: 'MH-23',
    },
    {
      label: 'MH-24 - Latur',
      value: 'MH-24',
    },
    {
      label: 'MH-25 - Osmanabad',
      value: 'MH-25',
    },
    {
      label: 'MH-26 - Nanded',
      value: 'MH-26',
    },
    {
      label: 'MH-27 - Amravati',
      value: 'MH-27',
    },
    {
      label: 'MH-28 - Buldhana',
      value: 'MH-28',
    },
    {
      label: 'MH-29 - Yavatmal',
      value: 'MH-29',
    },
    {
      label: 'MH-30 - Akola',
      value: 'MH-30',
    },
    {
      label: 'MH-31 - Nagpur West',
      value: 'MH-31',
    },
    {
      label: 'MH-32 - Wardha',
      value: 'MH-32',
    },
    {
      label: 'MH-33 - Gadchiroli',
      value: 'MH-33',
    },
    {
      label: 'MH-34 - Chandrapur',
      value: 'MH-34',
    },
    {
      label: 'MH-35 - Gondia',
      value: 'MH-35',
    },
    {
      label: 'MH-36 - Bhandara',
      value: 'MH-36',
    },
    {
      label: 'MH-37 - Washim',
      value: 'MH-37',
    },
    {
      label: 'MH-38 - Hingoli',
      value: 'MH-38',
    },
    {
      label: 'MH-39 - Nandurbar',
      value: 'MH-39',
    },
    {
      label: 'MH-40 - Nagpur (Rural)',
      value: 'MH-40',
    },
    {
      label: 'MH-41 - Malegaon',
      value: 'MH-41',
    },
    {
      label: 'MH-42 - Baramati',
      value: 'MH-42',
    },
    {
      label: 'MH-43 - Navi Mumbai',
      value: 'MH-43',
    },
    {
      label: 'MH-44 - Ambejogai',
      value: 'MH-44',
    },
    {
      label: 'MH-45 - Akluj',
      value: 'MH-45',
    },
    {
      label: 'MH-46 - Panvel also MSRTC buses are registered here',
      value: 'MH-46',
    },
    {
      label: 'MH-47 - Mumbai North',
      value: 'MH-47',
    },
    {
      label: 'MH-48 - Virar',
      value: 'MH-48',
    },
    {
      label: 'MH-49 - Nagpur East',
      value: 'MH-49',
    },
    {
      label: 'MH-50 - Karad (Satara Rural)',
      value: 'MH-50',
    },
    {
      label: 'MH-51 - Nashik Rural',
      value: 'MH-51',
    },
    {
      label: 'MH-52 - [Kanwati)',
      value: 'MH-52',
    },
    {
      label: 'MH-53 - Nanded South',
      value: 'MH-53',
    },
    {
      label: 'MH-54 - Pune South',
      value: 'MH-54',
    },
  ],
  MN: [
    {
      label: 'MN-01 - Imphal West',
      value: 'MN-01',
    },
    {
      label: 'MN-02 - Churachandpur',
      value: 'MN-02',
    },
    {
      label: 'MN-03 - Kangpokpi',
      value: 'MN-03',
    },
    {
      label: 'MN-04 - Thoubal',
      value: 'MN-04',
    },
    {
      label: 'MN-05 - Bishnupur',
      value: 'MN-05',
    },
    {
      label: 'MN-06 - Imphal East',
      value: 'MN-06',
    },
    {
      label: 'MN-07 - Ukhrul',
      value: 'MN-07',
    },
  ],
  ML: [
    {
      label: 'ML-01 - ML government vehicles',
      value: 'ML-01',
    },
    {
      label: 'ML-02 - ML police vehicles',
      value: 'ML-02',
    },
    {
      label: 'ML-03 - Vehicles',
      value: 'ML-03',
    },
    {
      label: 'ML-04 - Jaintia Hills',
      value: 'ML-04',
    },
    {
      label: 'ML-05 - Shillong',
      value: 'ML-05',
    },
    {
      label: 'ML-06 - West Khasi Hills',
      value: 'ML-06',
    },
    {
      label: 'ML-07 - East Garo Hills',
      value: 'ML-07',
    },
    {
      label: 'ML-08 - West Garo Hills(Tura)',
      value: 'ML-08',
    },
    {
      label: 'ML-09 - South Garo Hills',
      value: 'ML-09',
    },
    {
      label: 'ML-10 - Ri-Bhoi',
      value: 'ML-10',
    },
  ],
  MZ: [
    {
      label: 'MZ-01 - Aizawl',
      value: 'MZ-01',
    },
    {
      label: 'MZ-02 - Lunglei',
      value: 'MZ-02',
    },
    {
      label: 'MZ-03 - Saiha',
      value: 'MZ-03',
    },
    {
      label: 'MZ-04 - Champhai',
      value: 'MZ-04',
    },
    {
      label: 'MZ-05 - Kolasib',
      value: 'MZ-05',
    },
    {
      label: 'MZ-06 - Serchhip',
      value: 'MZ-06',
    },
    {
      label: 'MZ-07 - Lawngtlai',
      value: 'MZ-07',
    },
    {
      label: 'MZ-08 - Mamit',
      value: 'MZ-08',
    },
  ],
  NL: [
    {
      label: 'NL-01 - Kohima',
      value: 'NL-01',
    },
    {
      label: 'NL-02 - Mokokchung',
      value: 'NL-02',
    },
    {
      label: 'NL-03 - Tuensang',
      value: 'NL-03',
    },
    {
      label: 'NL-04 - Mon',
      value: 'NL-04',
    },
    {
      label: 'NL-05 - Wokha',
      value: 'NL-05',
    },
    {
      label: 'NL-06 - Zunheboto',
      value: 'NL-06',
    },
    {
      label: 'NL-07 - Dimapur',
      value: 'NL-07',
    },
    {
      label: 'NL-08 - Phek',
      value: 'NL-08',
    },
  ],
  OD: [
    {
      label: 'OD-01 - Balasore',
      value: 'OD-01',
    },
    {
      label: 'OD-02 - Bhubaneswar-I',
      value: 'OD-02',
    },
    {
      label: 'OD-03 - Bolangir',
      value: 'OD-03',
    },
    {
      label: 'OD-04 - Chandikhol',
      value: 'OD-04',
    },
    {
      label: 'OD-05 - Cuttack',
      value: 'OD-05',
    },
    {
      label: 'OD-06 - Dhenkanal',
      value: 'OD-06',
    },
    {
      label: 'OD-07 - Ganjam',
      value: 'OD-07',
    },
    {
      label: 'OD-08 - Kalahandi',
      value: 'OD-08',
    },
    {
      label: 'OD-09 - Keonjhar',
      value: 'OD-09',
    },
    {
      label: 'OD-10 - Koraput',
      value: 'OD-10',
    },
    {
      label: 'OD-11 - Mayurbhanj',
      value: 'OD-11',
    },
    {
      label: 'OD-12 - Phulabani Khandamal',
      value: 'OD-12',
    },
    {
      label: 'OD-13 - Puri',
      value: 'OD-13',
    },
    {
      label: 'OD-14 - Rourkela',
      value: 'OD-14',
    },
    {
      label: 'OD-15 - Sambalpur',
      value: 'OD-15',
    },
    {
      label: 'OD-16 - Sundergarh',
      value: 'OD-16',
    },
    {
      label: 'OD-17 - Baragarh',
      value: 'OD-17',
    },
    {
      label: 'OD-18 - Rayagada',
      value: 'OD-18',
    },
    {
      label: 'OD-19 - Angul',
      value: 'OD-19',
    },
    {
      label: 'OD-20 - Gajapati',
      value: 'OD-20',
    },
    {
      label: 'OD-21 - Jagatsinghpur',
      value: 'OD-21',
    },
    {
      label: 'OD-22 - Bhadrak',
      value: 'OD-22',
    },
    {
      label: 'OD-23 - Jharsuguda',
      value: 'OD-23',
    },
    {
      label: 'OD-24 - Nabarangpur',
      value: 'OD-24',
    },
    {
      label: 'OD-25 - Nayagarh',
      value: 'OD-25',
    },
    {
      label: 'OD-26 - Nuapada',
      value: 'OD-26',
    },
    {
      label: 'OD-27 - Boudh',
      value: 'OD-27',
    },
    {
      label: 'OD-28 - Debagarh',
      value: 'OD-28',
    },
    {
      label: 'OD-29 - Kendrapara',
      value: 'OD-29',
    },
    {
      label: 'OD-30 - Malkangiri',
      value: 'OD-30',
    },
    {
      label: 'OD-31 - Subarnapur',
      value: 'OD-31',
    },
    {
      label: 'OD-32 - Bhanjanagar',
      value: 'OD-32',
    },
    {
      label: 'OD-33 - Bhubaneswar-II',
      value: 'OD-33',
    },
    {
      label: 'OD-34 - Jajpur',
      value: 'OD-34',
    },
    {
      label: 'OD-35 - Talcher',
      value: 'OD-35',
    },
  ],
  PB: [
    {
      label: 'PB-01 - Chandigarh taxi vehicles from Punjab',
      value: 'PB-01',
    },
    {
      label: 'PB-02 - Amritsar',
      value: 'PB-02',
    },
    {
      label: 'PB-03 - Bathinda',
      value: 'PB-03',
    },
    {
      label: 'PB-04 - Faridkot',
      value: 'PB-04',
    },
    {
      label: 'PB-05 - Ferozepur',
      value: 'PB-05',
    },
    {
      label: 'PB-06 - Gurdaspur',
      value: 'PB-06',
    },
    {
      label: 'PB-07 - Hoshiarpur',
      value: 'PB-07',
    },
    {
      label: 'PB-08 - Jalandhar',
      value: 'PB-08',
    },
    {
      label: 'PB-09 - Kapurthala',
      value: 'PB-09',
    },
    {
      label: 'PB-10 - Ludhiana',
      value: 'PB-10',
    },
    {
      label: 'PB-11 - Patiala (city)',
      value: 'PB-11',
    },
    {
      label: 'PB-12 - Ropar',
      value: 'PB-12',
    },
    {
      label: 'PB-13 - Sangrur',
      value: 'PB-13',
    },
    {
      label: 'PB-14 - Ajnala',
      value: 'PB-14',
    },
    {
      label: 'PB-15 - Abohar',
      value: 'PB-15',
    },
    {
      label: 'PB-16 - Anandpur Sahib',
      value: 'PB-16',
    },
    {
      label: 'PB-17 - Baba Bakala',
      value: 'PB-17',
    },
    {
      label: 'PB-18 - Batala',
      value: 'PB-18',
    },
    {
      label: 'PB-19 - Barnala',
      value: 'PB-19',
    },
    {
      label: 'PB-20 - Balachaur',
      value: 'PB-20',
    },
    {
      label: 'PB-21 - Dasuya',
      value: 'PB-21',
    },
    {
      label: 'PB-22 - Fazilka',
      value: 'PB-22',
    },
    {
      label: 'PB-23 - Fatehgarh Sahib',
      value: 'PB-23',
    },
    {
      label: 'PB-24 - Garhshankar',
      value: 'PB-24',
    },
    {
      label: 'PB-25 - Jagraon',
      value: 'PB-25',
    },
    {
      label: 'PB-26 - Khanna',
      value: 'PB-26',
    },
    {
      label: 'PB-27 - Kharar',
      value: 'PB-27',
    },
    {
      label: 'PB-28 - Malerkotla',
      value: 'PB-28',
    },
    {
      label: 'PB-29 - Moga',
      value: 'PB-29',
    },
    {
      label: 'PB-30 - Muktsar',
      value: 'PB-30',
    },
    {
      label: 'PB-31 - Mansa',
      value: 'PB-31',
    },
    {
      label: 'PB-32 - Nawanshahar',
      value: 'PB-32',
    },
    {
      label: 'PB-33 - Nakodar',
      value: 'PB-33',
    },
    {
      label: 'PB-34 - Nabha (Patiala South West)',
      value: 'PB-34',
    },
    {
      label: 'PB-35 - Pathankot',
      value: 'PB-35',
    },
    {
      label: 'PB-36 - Phagwara',
      value: 'PB-36',
    },
    {
      label: 'PB-37 - Phillaur',
      value: 'PB-37',
    },
    {
      label: 'PB-38 - Patti',
      value: 'PB-38',
    },
    {
      label: 'PB-39 - Rajpura (Patiala North)',
      value: 'PB-39',
    },
    {
      label: 'PB-40 - Rampura Phul',
      value: 'PB-40',
    },
    {
      label: 'PB-41 - Sultanpur Lodhi',
      value: 'PB-41',
    },
    {
      label: 'PB-42 - Samana (Patiala East)',
      value: 'PB-42',
    },
    {
      label: 'PB-43 - Samrala',
      value: 'PB-43',
    },
    {
      label: 'PB-44 - Sunam',
      value: 'PB-44',
    },
    {
      label: 'PB-45 - Talwandi Sabo',
      value: 'PB-45',
    },
    {
      label: 'PB-46 - Tarn Taran',
      value: 'PB-46',
    },
    {
      label: 'PB-47 - Zira',
      value: 'PB-47',
    },
    {
      label: 'PB-48 - Amloh (Patiala West)',
      value: 'PB-48',
    },
    {
      label: 'PB-49 - Khamanon',
      value: 'PB-49',
    },
    {
      label: 'PB-50 - Budhlada',
      value: 'PB-50',
    },
    {
      label: 'PB-51 - Jhunir / Sardulgarh',
      value: 'PB-51',
    },
    {
      label: 'PB-52 - Bassi Pathana',
      value: 'PB-52',
    },
    {
      label: 'PB-53 - Malout',
      value: 'PB-53',
    },
    {
      label: 'PB-54 - Mukerian',
      value: 'PB-54',
    },
    {
      label: 'PB-55 - Payal',
      value: 'PB-55',
    },
    {
      label: 'PB-56 - Raikot',
      value: 'PB-56',
    },
    {
      label: 'PB-57 - Bhulath',
      value: 'PB-57',
    },
    {
      label: 'PB-58 - Dera Baba Nanak',
      value: 'PB-58',
    },
    {
      label: 'PB-59 - Dhuri',
      value: 'PB-59',
    },
    {
      label: 'PB-60 - Gidderbaha',
      value: 'PB-60',
    },
    {
      label: 'PB-61 - Jalalabad',
      value: 'PB-61',
    },
    {
      label: 'PB-62 - Jaitu',
      value: 'PB-62',
    },
    {
      label: 'PB-63 - Khadoor Sahib',
      value: 'PB-63',
    },
    {
      label: 'PB-64 - Moonak',
      value: 'PB-64',
    },
    {
      label: 'PB-65 - Mohali',
      value: 'PB-65',
    },
    {
      label: 'PB-66 - Nihal Singh Wala',
      value: 'PB-66',
    },
    {
      label: 'PB-67 - Shahkot',
      value: 'PB-67',
    },
    {
      label: 'PB-68 - Dhar Kalan (District Pathankot)',
      value: 'PB-68',
    },
    {
      label: 'PB-69 - Bagha Purana',
      value: 'PB-69',
    },
    {
      label: 'PB-70 - Dera Bassi',
      value: 'PB-70',
    },
    {
      label: 'PB-71 - Chamkaur Sahib',
      value: 'PB-71',
    },
    {
      label: 'PB-72 - Pattran (Patiala East)',
      value: 'PB-72',
    },
    {
      label: 'PB-73 - Tappa Mandi',
      value: 'PB-73',
    },
    {
      label: 'PB-74 - Nangal',
      value: 'PB-74',
    },
    {
      label: 'PB-75 - Lehragaga',
      value: 'PB-75',
    },
    {
      label: 'PB-76 - Ahmedgarh',
      value: 'PB-76',
    },
    {
      label: 'PB-77 - Guru Har Sahai',
      value: 'PB-77',
    },
  ],
  RJ: [
    {
      label: 'RJ-01 - Ajmer',
      value: 'RJ-01',
    },
    {
      label: 'RJ-02 - Alwar',
      value: 'RJ-02',
    },
    {
      label: 'RJ-03 - Banswara',
      value: 'RJ-03',
    },
    {
      label: 'RJ-04 - Barmer',
      value: 'RJ-04',
    },
    {
      label: 'RJ-05 - Bharatpur',
      value: 'RJ-05',
    },
    {
      label: 'RJ-06 - Bhilwara',
      value: 'RJ-06',
    },
    {
      label: 'RJ-07 - Bikaner',
      value: 'RJ-07',
    },
    {
      label: 'RJ-08 - Bundi',
      value: 'RJ-08',
    },
    {
      label: 'RJ-09 - Chittaurgarh',
      value: 'RJ-09',
    },
    {
      label: 'RJ-10 - Churu',
      value: 'RJ-10',
    },
    {
      label: 'RJ-11 - Dholpur',
      value: 'RJ-11',
    },
    {
      label: 'RJ-12 - Dungarpur',
      value: 'RJ-12',
    },
    {
      label: 'RJ-13 - Sri Ganganagar',
      value: 'RJ-13',
    },
    {
      label: 'RJ-14 - Jaipur South',
      value: 'RJ-14',
    },
    {
      label: 'RJ-15 - Jaisalmer',
      value: 'RJ-15',
    },
    {
      label: 'RJ-16 - Jalore',
      value: 'RJ-16',
    },
    {
      label: 'RJ-17 - Jhalawar',
      value: 'RJ-17',
    },
    {
      label: 'RJ-18 - Jhunjhunu',
      value: 'RJ-18',
    },
    {
      label: 'RJ-19 - Jodhpur',
      value: 'RJ-19',
    },
    {
      label: 'RJ-20 - Kota',
      value: 'RJ-20',
    },
    {
      label: 'RJ-21 - Nagaur',
      value: 'RJ-21',
    },
    {
      label: 'RJ-22 - Pali',
      value: 'RJ-22',
    },
    {
      label: 'RJ-23 - Sikar',
      value: 'RJ-23',
    },
    {
      label: 'RJ-24 - Sirohi',
      value: 'RJ-24',
    },
    {
      label: 'RJ-25 - Sawai Madhopur',
      value: 'RJ-25',
    },
    {
      label: 'RJ-26 - Tonk',
      value: 'RJ-26',
    },
    {
      label: 'RJ-27 - UDAIPUR-1',
      value: 'RJ-27',
    },
    {
      label: 'RJ-28 - Baran',
      value: 'RJ-28',
    },
    {
      label: 'RJ-29 - Dausa',
      value: 'RJ-29',
    },
    {
      label: 'RJ-30 - Rajsamand',
      value: 'RJ-30',
    },
    {
      label: 'RJ-31 - Hanumangarh',
      value: 'RJ-31',
    },
    {
      label: 'RJ-32 - Kotputli (Jaipur)',
      value: 'RJ-32',
    },
    {
      label: 'RJ-33 - Ramganj Mandi (Kota)',
      value: 'RJ-33',
    },
    {
      label: 'RJ-34 - Karauli',
      value: 'RJ-34',
    },
    {
      label: 'RJ-35 - Pratapgarh',
      value: 'RJ-35',
    },
    {
      label: 'RJ-36 - Beawar (Ajmer)',
      value: 'RJ-36',
    },
    {
      label: 'RJ-37 - Didwana (Nagaur)',
      value: 'RJ-37',
    },
    {
      label: 'RJ-38 - Abu Road (Sirohi)',
      value: 'RJ-38',
    },
    {
      label: 'RJ-39 - Balotra (Barmer)',
      value: 'RJ-39',
    },
    {
      label: 'RJ-40 - Bhiwadi (Alwar)',
      value: 'RJ-40',
    },
    {
      label: 'RJ-41 - Rambaag',
      value: 'RJ-41',
    },
    {
      label: 'RJ-42 - Kishangarh (Ajmer)',
      value: 'RJ-42',
    },
    {
      label: 'RJ-43 - Phalodi (Jodhpur)',
      value: 'RJ-43',
    },
    {
      label: 'RJ-44 - Sujangarh (Churu)',
      value: 'RJ-44',
    },
    {
      label: 'RJ-45 - Jaipur North',
      value: 'RJ-45',
    },
    {
      label: 'RJ-46 - Bhinmal (Jalore)',
      value: 'RJ-46',
    },
    {
      label: 'RJ-47 - Dudu (Jaipur)',
      value: 'RJ-47',
    },
    {
      label: 'RJ-48 - Kekri (Ajmer)',
      value: 'RJ-48',
    },
    {
      label: 'RJ-49 - Nohar (Hanumangarh)',
      value: 'RJ-49',
    },
    {
      label: 'RJ-50 - Nokha (Bikaner)',
      value: 'RJ-50',
    },
    {
      label: 'RJ-51 - Shahpura (Bhilwara)',
      value: 'RJ-51',
    },
    {
      label: 'RJ-59 - Shahpura (Jaipur)',
      value: 'RJ-59',
    },
  ],
  SK: [],
  TN: [
    {
      label: 'TN-01 - Chennai Central',
      value: 'TN-01',
    },
    {
      label: 'TN-02 - Chennai Anna Nagar',
      value: 'TN-02',
    },
    {
      label: 'TN-03 - Chennai Tondiarpet',
      value: 'TN-03',
    },
    {
      label: 'TN-04 - Chennai Royapuram',
      value: 'TN-04',
    },
    {
      label: 'TN-05 - Chennai Kolathur',
      value: 'TN-05',
    },
    {
      label: 'TN-06 - Chennai Mandavelli',
      value: 'TN-06',
    },
    {
      label: 'TN-07 - Chennai Tiruvanmiyur',
      value: 'TN-07',
    },
    {
      label: 'TN-09 - Chennai West & South East (K. K. Nagar)',
      value: 'TN-09',
    },
    {
      label: 'TN-10 - Chennai South West (Virugambakkam)',
      value: 'TN-10',
    },
    {
      label: 'TN-11 - Chennai Suburban South (Tambaram)',
      value: 'TN-11',
    },
    {
      label: 'TN-12 - Chennai Suburban (Poonamallee)',
      value: 'TN-12',
    },
    {
      label: 'TN-13 - Chennai Suburban North Central (Ambattur)',
      value: 'TN-13',
    },
    {
      label: 'TN-14 - Chennai Suburban South East Sholinganallur',
      value: 'TN-14',
    },
    {
      label: 'TN-15 - Ulundurpet',
      value: 'TN-15',
    },
    {
      label: 'TN-15Z - Kallakurichi',
      value: 'TN-15Z',
    },
    {
      label: 'TN-16 - Tindivanam',
      value: 'TN-16',
    },
    {
      label: 'TN-16Z - Gingee',
      value: 'TN-16Z',
    },
    {
      label: 'TN-18 - Chennai Suburban North (Red Hills',
      value: 'TN-18',
    },
    {
      label: 'TN-18Y - Gummidipoondi',
      value: 'TN-18Y',
    },
    {
      label: 'TN-19 - Chengalpattu',
      value: 'TN-19',
    },
    {
      label: 'TN-20 - Tiruvallur',
      value: 'TN-20',
    },
    {
      label: 'TN-20X - Thiruthani',
      value: 'TN-20X',
    },
    {
      label: 'TN-21 - Kanchipuram',
      value: 'TN-21',
    },
    {
      label: 'TN-22 - Chennai Alandur',
      value: 'TN-22',
    },
    {
      label: 'TN-23 - Vellore',
      value: 'TN-23',
    },
    {
      label: 'TN-23T - Gudiyatham',
      value: 'TN-23T',
    },
    {
      label: 'TN-24 - Krishnagiri',
      value: 'TN-24',
    },
    {
      label: 'TN-25 - Thiruvannamalai District',
      value: 'TN-25',
    },
    {
      label: 'TN-27 - Salem District (Not In Use)',
      value: 'TN-27',
    },
    {
      label: 'TN-28 - Namakkal North',
      value: 'TN-28',
    },
    {
      label: 'TN-29 - Dharmapuri',
      value: 'TN-29',
    },
    {
      label: 'TN-30 - Salem West',
      value: 'TN-30',
    },
    {
      label: 'TN-30W - Omalur',
      value: 'TN-30W',
    },
    {
      label: 'TN-31 - Cuddalore',
      value: 'TN-31',
    },
    {
      label: 'TN-31Z - Panruti',
      value: 'TN-31Z',
    },
    {
      label: 'TN-32 - Villupuram',
      value: 'TN-32',
    },
    {
      label: 'TN-33 - Erode East',
      value: 'TN-33',
    },
    {
      label: 'TN-34 - Thiruchengode',
      value: 'TN-34',
    },
    {
      label: 'TN-36 - Gobichettipalayam',
      value: 'TN-36',
    },
    {
      label: 'TN-36W - Bhavani',
      value: 'TN-36W',
    },
    {
      label: 'TN-36Z - Sathyamangalam',
      value: 'TN-36Z',
    },
    {
      label: 'TN-37 - Coimbatore South',
      value: 'TN-37',
    },
    {
      label: 'TN-37Z - Sulur',
      value: 'TN-37Z',
    },
    {
      label: 'TN-38 - Coimbatore North',
      value: 'TN-38',
    },
    {
      label: 'TN-39 - Tirupur',
      value: 'TN-39',
    },
    {
      label: 'TN-39Z - Avinashi',
      value: 'TN-39Z',
    },
    {
      label: 'TN-40 - Mettupalayam',
      value: 'TN-40',
    },
    {
      label: 'TN-41 - Pollachi',
      value: 'TN-41',
    },
    {
      label: 'TN-41W - Valparai',
      value: 'TN-41W',
    },
    {
      label: 'TN-42 - Tirupur South',
      value: 'TN-42',
    },
    {
      label: 'TN-42Y - Kangayam',
      value: 'TN-42Y',
    },
    {
      label: 'TN-43 - Ooty',
      value: 'TN-43',
    },
    {
      label: 'TN-45 - Tiruchirapalli East',
      value: 'TN-45',
    },
    {
      label: 'TN-45Z - Manaparai',
      value: 'TN-45Z',
    },
    {
      label: 'TN-46 - Perambalur',
      value: 'TN-46',
    },
    {
      label: 'TN-47 - Karur',
      value: 'TN-47',
    },
    {
      label: 'TN-48 - Srirangam',
      value: 'TN-48',
    },
    {
      label: 'TN-48X - Lalgudi',
      value: 'TN-48X',
    },
    {
      label: 'TN-48Z - Thuraiyur',
      value: 'TN-48Z',
    },
    {
      label: 'TN-49 - Thanjavur',
      value: 'TN-49',
    },
    {
      label: 'TN-50 - Tiruvarur',
      value: 'TN-50',
    },
    {
      label: 'TN-50Z - Mannargudi',
      value: 'TN-50Z',
    },
    {
      label: 'TN-51 - Nagapattinam',
      value: 'TN-51',
    },
    {
      label: 'TN-52 - Sankagiri',
      value: 'TN-52',
    },
    {
      label: 'TN-54 - Salem East',
      value: 'TN-54',
    },
    {
      label: 'TN-55 - Pudukottai',
      value: 'TN-55',
    },
    {
      label: 'TN-56 - Perundurai',
      value: 'TN-56',
    },
    {
      label: 'TN-57 - Dindigul',
      value: 'TN-57',
    },
    {
      label: 'TN-58 - Madurai South',
      value: 'TN-58',
    },
    {
      label: 'TN-59 - Madurai North',
      value: 'TN-59',
    },
    {
      label: 'TN-60 - Theni',
      value: 'TN-60',
    },
    {
      label: 'TN-61 - Ariyalur',
      value: 'TN-61',
    },
    {
      label: 'TN-63 - Sivaganga district',
      value: 'TN-63',
    },
    {
      label: 'TN-63Z - Karaikudi',
      value: 'TN-63Z',
    },
    {
      label: 'TN-64 - Madurai Central',
      value: 'TN-64',
    },
    {
      label: 'TN-65 - Ramanathapuram',
      value: 'TN-65',
    },
    {
      label: 'TN-66 - Coimbatore Central',
      value: 'TN-66',
    },
    {
      label: 'TN-67 - Virudhunagar',
      value: 'TN-67',
    },
    {
      label: 'TN-67W - Aruppukottai',
      value: 'TN-67W',
    },
    {
      label: 'TN-68 - Kumbakonam',
      value: 'TN-68',
    },
    {
      label: 'TN-69 - Thoothukudi',
      value: 'TN-69',
    },
    {
      label: 'TN-70 - Hosur',
      value: 'TN-70',
    },
    {
      label: 'TN-72 - Tirunelveli',
      value: 'TN-72',
    },
    {
      label: 'TN-73 - Ranipet',
      value: 'TN-73',
    },
    {
      label: 'TN-73Z - Arakkonam',
      value: 'TN-73Z',
    },
    {
      label: 'TN-74 - Nagercoil',
      value: 'TN-74',
    },
    {
      label: 'TN-75 - Marthandam',
      value: 'TN-75',
    },
    {
      label: 'TN-76 - Tenkasi',
      value: 'TN-76',
    },
    {
      label: 'TN-77 - Attur',
      value: 'TN-77',
    },
    {
      label: 'TN-77Z - Valapadi',
      value: 'TN-77Z',
    },
    {
      label: 'TN-78 - Dharapuram',
      value: 'TN-78',
    },
    {
      label: 'TN-78Z - Udumalpet',
      value: 'TN-78Z',
    },
    {
      label: 'TN-79 - Sankarankovil',
      value: 'TN-79',
    },
    {
      label: 'TN-81 - Tiruchirapalli East',
      value: 'TN-81',
    },
    {
      label: 'TN-82 - Mayiladuthurai',
      value: 'TN-82',
    },
    {
      label: 'TN-82Z - Sirkazhi',
      value: 'TN-82Z',
    },
    {
      label: 'TN-83 - Vaniyambadi',
      value: 'TN-83',
    },
    {
      label: 'TN-83Z - Ambur',
      value: 'TN-83Z',
    },
    {
      label: 'TN-84 - Srivilliputhur',
      value: 'TN-84',
    },
    {
      label: 'TN-85 - Chennai Manapakkam',
      value: 'TN-85',
    },
    {
      label: 'TN-86 - Erode West',
      value: 'TN-86',
    },
    {
      label: 'TN-87 - Sriperumbudur',
      value: 'TN-87',
    },
    {
      label: 'TN-88 - Namakkal South',
      value: 'TN-88',
    },
    {
      label: 'TN-88Z - Paramathi Velur',
      value: 'TN-88Z',
    },
    {
      label: 'TN-90 - Salem South',
      value: 'TN-90',
    },
    {
      label: 'TN-91 - Chidambaram',
      value: 'TN-91',
    },
    {
      label: 'TN-91Y - Neyveli',
      value: 'TN-91Y',
    },
    {
      label: 'TN-91Z - Virudhachalam',
      value: 'TN-91Z',
    },
    {
      label: 'TN-92 - Thiruchendur',
      value: 'TN-92',
    },
    {
      label: 'TN-93 - Mettur',
      value: 'TN-93',
    },
    {
      label: 'TN-94 - Palani',
      value: 'TN-94',
    },
    {
      label: 'TN-95 - Sivakasi',
      value: 'TN-95',
    },
    {
      label: 'TN-96 - Kovilpatti',
      value: 'TN-96',
    },
    {
      label: 'TN-99 - Coimbatore - West',
      value: 'TN-99',
    },
  ],
  TS: [
    {
      label: 'TS-01 - Adilabad',
      value: 'TS-01',
    },
    {
      label: 'TS-02 - Karimnagar',
      value: 'TS-02',
    },
    {
      label: 'TS-03 - Warangal',
      value: 'TS-03',
    },
    {
      label: 'TS-04 - Khammam',
      value: 'TS-04',
    },
    {
      label: 'TS-05 - Nalgonda',
      value: 'TS-05',
    },
    {
      label: 'TS-06 - Mahbubnagar',
      value: 'TS-06',
    },
    {
      label: 'TS-07 - Ranga Reddy',
      value: 'TS-07',
    },
    {
      label: 'TS-08 - Medchal',
      value: 'TS-08',
    },
    {
      label: 'TS-09 - Hyderabad Central (Khairtabad)',
      value: 'TS-09',
    },
    {
      label: 'TS-10 - Hyderabad North (Secunderabad)',
      value: 'TS-10',
    },
    {
      label: 'TS-11 - Hyderabad East (Malakpet)',
      value: 'TS-11',
    },
    {
      label: 'TS-12 - Hyderabad South (Kishanbagh)',
      value: 'TS-12',
    },
    {
      label: 'TS-13 - Hyderabad West (Tolichowki)',
      value: 'TS-13',
    },
    {
      label: 'TS-14 - Hyderabad (reserved)',
      value: 'TS-14',
    },
    {
      label: 'TS-15 - Sangareddy',
      value: 'TS-15',
    },
    {
      label: 'TS-16 - Nizamabad',
      value: 'TS-16',
    },
    {
      label: 'TS-17 - Kamareddy',
      value: 'TS-17',
    },
    {
      label: 'TS-18 - Nirmal',
      value: 'TS-18',
    },
    {
      label: 'TS-19 - Mancherial',
      value: 'TS-19',
    },
    {
      label: 'TS-20 - Asifabad (Komaram Bheem)',
      value: 'TS-20',
    },
    {
      label: 'TS-21 - Jagtial',
      value: 'TS-21',
    },
    {
      label: 'TS-22 - Peddapalli',
      value: 'TS-22',
    },
    {
      label: 'TS-23 - Sircilla',
      value: 'TS-23',
    },
    {
      label: 'TS-24 - Warangal (rural)',
      value: 'TS-24',
    },
    {
      label: 'TS-25 - Jayashankar',
      value: 'TS-25',
    },
    {
      label: 'TS-26 - Mahabubabad',
      value: 'TS-26',
    },
    {
      label: 'TS-27 - Jangaon',
      value: 'TS-27',
    },
    {
      label: 'TS-28 - Bhadradri',
      value: 'TS-28',
    },
    {
      label: 'TS-29 - Suryapet',
      value: 'TS-29',
    },
    {
      label: 'TS-30 - Yadadri',
      value: 'TS-30',
    },
    {
      label: 'TS-31 - Nagarkurnool',
      value: 'TS-31',
    },
    {
      label: 'TS-32 - Wanaparthy',
      value: 'TS-32',
    },
    {
      label: 'TS-33 - Gadwal',
      value: 'TS-33',
    },
    {
      label: 'TS-34 - Vikarabad',
      value: 'TS-34',
    },
    {
      label: 'TS-35 - Medak',
      value: 'TS-35',
    },
    {
      label: 'TS-36 - Siddipet',
      value: 'TS-36',
    },
  ],
  TR: [
    {
      label: 'TR-01 - Agartala',
      value: 'TR-01',
    },
    {
      label: 'TR-02 - Kailasahar',
      value: 'TR-02',
    },
    {
      label: 'TR-03 - Udaipur',
      value: 'TR-03',
    },
    {
      label: 'TR-04 - Ambassa',
      value: 'TR-04',
    },
    {
      label: 'TR-05 - Dharmanagar',
      value: 'TR-05',
    },
    {
      label: 'TR-06 - Khowai',
      value: 'TR-06',
    },
    {
      label: 'TR-07 - Sepahijala',
      value: 'TR-07',
    },
    {
      label: 'TR-08 - Santirbazar',
      value: 'TR-08',
    },
  ],
  UP: [
    {
      label: 'UP-11 - Saharanpur',
      value: 'UP-11',
    },
    {
      label: 'UP-12 - Muzaffarnagar',
      value: 'UP-12',
    },
    {
      label: 'UP-13 - Bulandshahar',
      value: 'UP-13',
    },
    {
      label: 'UP-14 - Ghaziabad',
      value: 'UP-14',
    },
    {
      label: 'UP-15 - Meerut',
      value: 'UP-15',
    },
    {
      label: 'UP-16 - Gautam Budh Nagar/Noida',
      value: 'UP-16',
    },
    {
      label: 'UP-17 - Baghpat',
      value: 'UP-17',
    },
    {
      label: 'UP-19 - Shamli',
      value: 'UP-19',
    },
    {
      label: 'UP-20 - Bijnor',
      value: 'UP-20',
    },
    {
      label: 'UP-21 - Moradabad',
      value: 'UP-21',
    },
    {
      label: 'UP-22 - Rampur',
      value: 'UP-22',
    },
    {
      label: 'UP-23 - Amroha',
      value: 'UP-23',
    },
    {
      label: 'UP-24 - Badaun',
      value: 'UP-24',
    },
    {
      label: 'UP-25 - Bareilly',
      value: 'UP-25',
    },
    {
      label: 'UP-26 - Pilibhit',
      value: 'UP-26',
    },
    {
      label: 'UP-27 - Shahjahanpur',
      value: 'UP-27',
    },
    {
      label: 'UP-28 - Ayodhya',
      value: 'UP-28',
    },
    {
      label: 'UP-30 - Hardoi',
      value: 'UP-30',
    },
    {
      label: 'UP-31 - Lakhimpur Kheri',
      value: 'UP-31',
    },
    {
      label: 'UP-32 - Lucknow',
      value: 'UP-32',
    },
    {
      label: 'UP-33 - Raebareli',
      value: 'UP-33',
    },
    {
      label: 'UP-34 - Sitapur',
      value: 'UP-34',
    },
    {
      label: 'UP-35 - Unnao',
      value: 'UP-35',
    },
    {
      label: 'UP-36 - Amethi',
      value: 'UP-36',
    },
    {
      label: 'UP-37 - Hapur',
      value: 'UP-37',
    },
    {
      label: 'UP-38 - Sambhal district',
      value: 'UP-38',
    },
    {
      label: 'UP-40 - Bahraich',
      value: 'UP-40',
    },
    {
      label: 'UP-41 - Barabanki',
      value: 'UP-41',
    },
    {
      label: 'UP-42 - Faizabad',
      value: 'UP-42',
    },
    {
      label: 'UP-43 - Gonda',
      value: 'UP-43',
    },
    {
      label: 'UP-44 - Sultanpur',
      value: 'UP-44',
    },
    {
      label: 'UP-45 - Ambedkar Nagar',
      value: 'UP-45',
    },
    {
      label: 'UP-46 - Shravasti',
      value: 'UP-46',
    },
    {
      label: 'UP-47 - Balrampur',
      value: 'UP-47',
    },
    {
      label: 'UP-50 - Azamgarh',
      value: 'UP-50',
    },
    {
      label: 'UP-51 - Basti',
      value: 'UP-51',
    },
    {
      label: 'UP-52 - Deoria',
      value: 'UP-52',
    },
    {
      label: 'UP-53 - Gorakhpur',
      value: 'UP-53',
    },
    {
      label: 'UP-54 - Mau',
      value: 'UP-54',
    },
    {
      label: 'UP-55 - Siddharth Nagar',
      value: 'UP-55',
    },
    {
      label: 'UP-56 - Maharajganj',
      value: 'UP-56',
    },
    {
      label: 'UP-57 - Kushinagar',
      value: 'UP-57',
    },
    {
      label: 'UP-58 - Sant Kabir Nagar',
      value: 'UP-58',
    },
    {
      label: 'UP-60 - Ballia',
      value: 'UP-60',
    },
    {
      label: 'UP-61 - Ghazipur',
      value: 'UP-61',
    },
    {
      label: 'UP-62 - Jaunpur',
      value: 'UP-62',
    },
    {
      label: 'UP-63 - Mirzapur',
      value: 'UP-63',
    },
    {
      label: 'UP-64 - Sonbhadra',
      value: 'UP-64',
    },
    {
      label: 'UP-65 - Varanasi',
      value: 'UP-65',
    },
    {
      label: 'UP-66 - Bhadohi',
      value: 'UP-66',
    },
    {
      label: 'UP-67 - Chandauli',
      value: 'UP-67',
    },
    {
      label: 'UP-70 - Allahabad',
      value: 'UP-70',
    },
    {
      label: 'UP-71 - Fatehpur',
      value: 'UP-71',
    },
    {
      label: 'UP-72 - Pratapgarh',
      value: 'UP-72',
    },
    {
      label: 'UP-73 - Kaushambi',
      value: 'UP-73',
    },
    {
      label: 'UP-74 - Kannauj',
      value: 'UP-74',
    },
    {
      label: 'UP-75 - Etawah',
      value: 'UP-75',
    },
    {
      label: 'UP-76 - Farrukhabad',
      value: 'UP-76',
    },
    {
      label: 'UP-77 - Kanpur Dehat (rural)',
      value: 'UP-77',
    },
    {
      label: 'UP-78 - Kanpur Nagar (urban)',
      value: 'UP-78',
    },
    {
      label: 'UP-79 - Auraiya',
      value: 'UP-79',
    },
    {
      label: 'UP-80 - Agra',
      value: 'UP-80',
    },
    {
      label: 'UP-81 - Aligarh',
      value: 'UP-81',
    },
    {
      label: 'UP-82 - Etah',
      value: 'UP-82',
    },
    {
      label: 'UP-83 - Firozabad',
      value: 'UP-83',
    },
    {
      label: 'UP-84 - Mainpuri',
      value: 'UP-84',
    },
    {
      label: 'UP-85 - Mathura',
      value: 'UP-85',
    },
    {
      label: 'UP-86 - Hathras',
      value: 'UP-86',
    },
    {
      label: 'UP-87 - Kasganj',
      value: 'UP-87',
    },
    {
      label: 'UP-90 - Banda',
      value: 'UP-90',
    },
    {
      label: 'UP-91 - Hamirpur',
      value: 'UP-91',
    },
    {
      label: 'UP-92 - Jalaun',
      value: 'UP-92',
    },
    {
      label: 'UP-93 - Jhansi',
      value: 'UP-93',
    },
    {
      label: 'UP-94 - Lalitpur',
      value: 'UP-94',
    },
    {
      label: 'UP-95 - Mahoba',
      value: 'UP-95',
    },
    {
      label: 'UP-96 - Chitrakoot',
      value: 'UP-96',
    },
  ],
  UK: [
    {
      label: 'UK-01 - Almora',
      value: 'UK-01',
    },
    {
      label: 'UK-02 - Bageshwar',
      value: 'UK-02',
    },
    {
      label: 'UK-03 - Champawat',
      value: 'UK-03',
    },
    {
      label: 'UK-04 - Nainital',
      value: 'UK-04',
    },
    {
      label: 'UK-05 - Pithoragarh',
      value: 'UK-05',
    },
    {
      label: 'UK-06 - Rudrapur',
      value: 'UK-06',
    },
    {
      label: 'UK-07 - Dehradun',
      value: 'UK-07',
    },
    {
      label: 'UK-08 - Haridwar',
      value: 'UK-08',
    },
    {
      label: 'UK-09 - Tehri',
      value: 'UK-09',
    },
    {
      label: 'UK-10 - Uttarkashi',
      value: 'UK-10',
    },
    {
      label: 'UK-11 - Chamoli Gopeshwar',
      value: 'UK-11',
    },
    {
      label: 'UK-12 - Pauri',
      value: 'UK-12',
    },
    {
      label: 'UK-13 - Rudraprayag',
      value: 'UK-13',
    },
    {
      label: 'UK-14 - Rishikesh',
      value: 'UK-14',
    },
    {
      label: 'UK-15 - Kotdwar',
      value: 'UK-15',
    },
    {
      label: 'UK-16 - Vikasnagar',
      value: 'UK-16',
    },
    {
      label: 'UK-17 - Roorkee',
      value: 'UK-17',
    },
    {
      label: 'UK-18 - Kashipur',
      value: 'UK-18',
    },
  ],
  WB: [
    {
      label: 'WB-01 - Kolkata',
      value: 'WB-01',
    },
    {
      label: 'WB-02 - Kolkata',
      value: 'WB-02',
    },
    {
      label: 'WB-03 - Kolkata Beltala',
      value: 'WB-03',
    },
    {
      label: 'WB-04 - Kolkata Beltala',
      value: 'WB-04',
    },
    {
      label: 'WB-05 - Kolkata Kasba',
      value: 'WB-05',
    },
    {
      label: 'WB-06 - Kolkata Kasba',
      value: 'WB-06',
    },
    {
      label: 'WB-07 - Kolkata Salt Lake',
      value: 'WB-07',
    },
    {
      label: 'WB-08 - Kolkata Salt Lake',
      value: 'WB-08',
    },
    {
      label: 'WB-09 - Kolkata New Town',
      value: 'WB-09',
    },
    {
      label: 'WB-10 - Kolkata New Town',
      value: 'WB-10',
    },
    {
      label: 'WB-11 - Howrah',
      value: 'WB-11',
    },
    {
      label: 'WB-12 - Howrah',
      value: 'WB-12',
    },
    {
      label: 'WB-13 - Uluberia',
      value: 'WB-13',
    },
    {
      label: 'WB-14 - Uluberia',
      value: 'WB-14',
    },
    {
      label: 'WB-15 - Hugli-Chuchura',
      value: 'WB-15',
    },
    {
      label: 'WB-16 - Hugli-Chuchura',
      value: 'WB-16',
    },
    {
      label: 'WB-17 - Hooghly Srirampur',
      value: 'WB-17',
    },
    {
      label: 'WB-18 - Hooghly Srirampur',
      value: 'WB-18',
    },
    {
      label: 'WB-19 - Alipore',
      value: 'WB-19',
    },
    {
      label: 'WB-20 - Alipore',
      value: 'WB-20',
    },
    {
      label: 'WB-23 - Barrackpore',
      value: 'WB-23',
    },
    {
      label: 'WB-24 - Barrackpore',
      value: 'WB-24',
    },
    {
      label: 'WB-25 - Barasat',
      value: 'WB-25',
    },
    {
      label: 'WB-26 - Barasat',
      value: 'WB-26',
    },
    {
      label: 'WB-27 - Bangaon',
      value: 'WB-27',
    },
    {
      label: 'WB-28 - Bangaon',
      value: 'WB-28',
    },
    {
      label: 'WB-29 - Tamluk',
      value: 'WB-29',
    },
    {
      label: 'WB-30 - Tamluk',
      value: 'WB-30',
    },
    {
      label: 'WB-31 - Contai',
      value: 'WB-31',
    },
    {
      label: 'WB-32 - Contai',
      value: 'WB-32',
    },
    {
      label: 'WB-33 - Midnapur',
      value: 'WB-33',
    },
    {
      label: 'WB-34 - Midnapur',
      value: 'WB-34',
    },
    {
      label: 'WB-36 - Midnapur',
      value: 'WB-36',
    },
    {
      label: 'WB-37 - Asansol',
      value: 'WB-37',
    },
    {
      label: 'WB-38 - Asansol',
      value: 'WB-38',
    },
    {
      label: 'WB-39 - Durgapur',
      value: 'WB-39',
    },
    {
      label: 'WB-40 - Durgapur',
      value: 'WB-40',
    },
    {
      label: 'WB-41 - Burdwan',
      value: 'WB-41',
    },
    {
      label: 'WB-42 - Burdwan',
      value: 'WB-42',
    },
    {
      label: 'WB-43 - Kalna',
      value: 'WB-43',
    },
    {
      label: 'WB-44 - Asansol',
      value: 'WB-44',
    },
    {
      label: 'WB-45 - Asansol',
      value: 'WB-45',
    },
    {
      label: 'WB-46 - Kalna',
      value: 'WB-46',
    },
    {
      label: 'WB-47 - Bolpur',
      value: 'WB-47',
    },
    {
      label: 'WB-48 - Bolpur',
      value: 'WB-48',
    },
    {
      label: 'WB-49 - Jhargram',
      value: 'WB-49',
    },
    {
      label: 'WB-50 - Jhargram',
      value: 'WB-50',
    },
    {
      label: 'WB-51 - Krishnanagar',
      value: 'WB-51',
    },
    {
      label: 'WB-52 - Krishnanagar',
      value: 'WB-52',
    },
    {
      label: 'WB-53 - Birbhum',
      value: 'WB-53',
    },
    {
      label: 'WB-54 - Birbhum',
      value: 'WB-54',
    },
    {
      label: 'WB-55 - Purulia',
      value: 'WB-55',
    },
    {
      label: 'WB-56 - Purulia',
      value: 'WB-56',
    },
    {
      label: 'WB-57 - Murshidabad',
      value: 'WB-57',
    },
    {
      label: 'WB-58 - Murshidabad',
      value: 'WB-58',
    },
    {
      label: 'WB-59 - Raiganj',
      value: 'WB-59',
    },
    {
      label: 'WB-60 - Raiganj',
      value: 'WB-60',
    },
    {
      label: 'WB-61 - Balurghat',
      value: 'WB-61',
    },
    {
      label: 'WB-62 - Balurghat',
      value: 'WB-62',
    },
    {
      label: 'WB-63 - Cooch Behar',
      value: 'WB-63',
    },
    {
      label: 'WB-64 - Cooch Behar',
      value: 'WB-64',
    },
    {
      label: 'WB-65 - Malda',
      value: 'WB-65',
    },
    {
      label: 'WB-66 - Malda',
      value: 'WB-66',
    },
    {
      label: 'WB-67 - Bankura',
      value: 'WB-67',
    },
    {
      label: 'WB-68 - Bankura',
      value: 'WB-68',
    },
    {
      label: 'WB-69 - Alipurduar',
      value: 'WB-69',
    },
    {
      label: 'WB-70 - Alipurduar',
      value: 'WB-70',
    },
    {
      label: 'WB-71 - Jalpaiguri',
      value: 'WB-71',
    },
    {
      label: 'WB-72 - Jalpaiguri',
      value: 'WB-72',
    },
    {
      label: 'WB-73 - Siliguri',
      value: 'WB-73',
    },
    {
      label: 'WB-74 - Siliguri',
      value: 'WB-74',
    },
    {
      label: 'WB-76 - Darjeeling',
      value: 'WB-76',
    },
    {
      label: 'WB-77 - Darjeeling',
      value: 'WB-77',
    },
    {
      label: 'WB-78 - Kalimpong',
      value: 'WB-78',
    },
    {
      label: 'WB-79 - Kalimpong',
      value: 'WB-79',
    },
    {
      label: 'WB-82 - Raghunathpur',
      value: 'WB-82',
    },
    {
      label: 'WB-85 - Mathabhanga RTO',
      value: 'WB-85',
    },
    {
      label: 'WB-86 - Mathabhanga RTO',
      value: 'WB-86',
    },
    {
      label: 'WB-87 - Bishnupur',
      value: 'WB-87',
    },
    {
      label: 'WB-88 - Bishnupur',
      value: 'WB-88',
    },
    {
      label: 'WB-89 - Kalyani',
      value: 'WB-89',
    },
    {
      label: 'WB-90 - Kalyani',
      value: 'WB-90',
    },
    {
      label: 'WB-91 - Islampur',
      value: 'WB-91',
    },
    {
      label: 'WB-92 - Islampur',
      value: 'WB-92',
    },
    {
      label: 'WB-93 - Jangipur, West Bengal',
      value: 'WB-93',
    },
    {
      label: 'WB-94 - Jangipur, West Bengal',
      value: 'WB-94',
    },
    {
      label: 'WB-96 - Baruipur',
      value: 'WB-96',
    },
  ],
  CH: [
    {
      label: 'CH-01 - Chandigarh',
      value: 'CH-01',
    },
    {
      label: 'CH-02 - Chandigarh',
      value: 'CH-02',
    },
    {
      label: 'CH-03 - Chandigarh',
      value: 'CH-03',
    },
    {
      label: 'CH-04 - Chandigarh',
      value: 'CH-04',
    },
  ],
  DNHDD: [
    {
      label: 'DN-09 - Silvassa',
      value: 'DN-09',
    },
    {
      label: 'DD-02 - Diu Diu district',
      value: 'DD-02',
    },
    {
      label: 'DD-03 - Daman',
      value: 'DD-03',
    },
  ],
  DL: [
    {
      label: 'DL-01 - Civil Lines',
      value: 'DL-01',
    },
    {
      label: 'DL-02 - Indraprastha Depot',
      value: 'DL-02',
    },
    {
      label: 'DL-03 - Sheikh Sarai',
      value: 'DL-03',
    },
    {
      label: 'DL-04 - Janakpuri',
      value: 'DL-04',
    },
    {
      label: 'DL-05 - Loni Road',
      value: 'DL-05',
    },
    {
      label: 'DL-06 - Sarai Kale Khan, Delhi',
      value: 'DL-06',
    },
    {
      label: 'DL-07 - Mayur Vihar',
      value: 'DL-07',
    },
    {
      label: 'DL-08 - Wazir Pur',
      value: 'DL-08',
    },
    {
      label: 'DL-09 - Dwarka, Delhi',
      value: 'DL-09',
    },
    {
      label: 'DL-10 - Raja Garden',
      value: 'DL-10',
    },
    {
      label: 'DL-11 - Rohini',
      value: 'DL-11',
    },
    {
      label: 'DL-12 - Vasant Vihar',
      value: 'DL-12',
    },
    {
      label: 'DL-13 - Surajmal Vihar',
      value: 'DL-13',
    },
    {
      label: 'DL-14 - Sonipat',
      value: 'DL-14',
    },
    {
      label: 'DL-15 - Gurgaon',
      value: 'DL-15',
    },
    {
      label: 'DL-16 - Faridabad',
      value: 'DL-16',
    },
    {
      label: 'DL-17 - Noida',
      value: 'DL-17',
    },
    {
      label: 'DL-18 - Ghaziabad',
      value: 'DL-18',
    },
    {
      label: 'DL-30 - Noida',
      value: 'DL-30',
    },
  ],
  JK: [
    {
      label: 'JK-01 - Srinagar',
      value: 'JK-01',
    },
    {
      label: 'JK-02 - Jammu',
      value: 'JK-02',
    },
    {
      label: 'JK-03 - Anantnag',
      value: 'JK-03',
    },
    {
      label: 'JK-04 - Budgam',
      value: 'JK-04',
    },
    {
      label: 'JK-05 - Baramulla',
      value: 'JK-05',
    },
    {
      label: 'JK-06 - Doda',
      value: 'JK-06',
    },
    {
      label: 'JK-07 - Kargil',
      value: 'JK-07',
    },
    {
      label: 'JK-08 - Kathua',
      value: 'JK-08',
    },
    {
      label: 'JK-09 - Kupwara',
      value: 'JK-09',
    },
    {
      label: 'JK-10 - Leh',
      value: 'JK-10',
    },
    {
      label: 'JK-11 - Rajouri',
      value: 'JK-11',
    },
    {
      label: 'JK-12 - Poonch',
      value: 'JK-12',
    },
    {
      label: 'JK-13 - Pulwama',
      value: 'JK-13',
    },
    {
      label: 'JK-14 - Udhampur',
      value: 'JK-14',
    },
    {
      label: 'JK-15 - Bandipora',
      value: 'JK-15',
    },
    {
      label: 'JK-16 - Ganderbal',
      value: 'JK-16',
    },
    {
      label: 'JK-17 - Kishtwar',
      value: 'JK-17',
    },
    {
      label: 'JK-18 - Kulgam',
      value: 'JK-18',
    },
    {
      label: 'JK-19 - Ramban',
      value: 'JK-19',
    },
    {
      label: 'JK-20 - Reasi',
      value: 'JK-20',
    },
    {
      label: 'JK-21 - Samba',
      value: 'JK-21',
    },
    {
      label: 'JK-22 - Shopian',
      value: 'JK-22',
    },
  ],
  LA: [],
  LD: [
    {
      label: 'LD-01 - Kavaratti',
      value: 'LD-01',
    },
    {
      label: 'LD-02 - Agatti',
      value: 'LD-02',
    },
    {
      label: 'LD-03 - Amini',
      value: 'LD-03',
    },
    {
      label: 'LD-04 - Androth',
      value: 'LD-04',
    },
    {
      label: 'LD-05 - Kadmat',
      value: 'LD-05',
    },
    {
      label: 'LD-06 - Kiltan',
      value: 'LD-06',
    },
    {
      label: 'LD-07 - Chetlat',
      value: 'LD-07',
    },
    {
      label: 'LD-08 - Kalpeni',
      value: 'LD-08',
    },
    {
      label: 'LD-09 - Minicoy',
      value: 'LD-09',
    },
  ],
  PY: [
    {
      label: 'PY-01 - Puducherry',
      value: 'PY-01',
    },
    {
      label: 'PY-02 - Karaikal',
      value: 'PY-02',
    },
    {
      label: 'PY-03 - Mahe',
      value: 'PY-03',
    },
    {
      label: 'PY-04 - Yanam',
      value: 'PY-04',
    },
    {
      label: 'PY-05 - Oulgaret',
      value: 'PY-05',
    },
  ],
};
