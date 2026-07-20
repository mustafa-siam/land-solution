const Operation_MESSAGES = {
  SUCCESS: 'Operation successful',
  FAILED: 'Operation failed',
};

const STATUS = {
  PENDING: 'pending',
  PUBLISHED: 'published',
} as const;

const Approval = {
  PENDING: 'pending',
  PUBLISHED: 'published',
} as const;


const PropertyType = {
  Apartment: 'apartment',
  Flat: 'flat',
  Room: 'room',
  House: 'house',
  Office: 'office',
  Shop: 'shop',
  Warehouse: 'warehouse',
  Land: 'land',
} as const;

const Availability = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  RENTED: 'rented',
  SOLD: 'sold'
} as const;

const BoostLevel = {
  NONE: 'none',
  SILVER: 'silver',
  GOLD: 'gold',
} as const;

const Gas = {
  LINE: 'line',
  CYLINDER: 'cylinder', 
  NULL: "null"
} as const;

const Facing = {
  // Primary Directions
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west',

  // Secondary/Intercardinal Directions
  NORTHEAST: 'northeast',
  NORTHWEST: 'northwest',
  SOUTHEAST: 'southeast',
  SOUTHWEST: 'southwest',
} as const;

const ElectricityType = {
  PREPAID: 'prepaid',    // Customer pays for electricity consumption in advance
  POSTPAID: 'postpaid',  // Customer is billed after consumption (traditional)
  METERED: 'metered',    // Usage is tracked by a meter (Can apply to prepaid or postpaid, but useful if distinguishing from flat rate)
  // FLAT_RATE: 'flat_rate', // Alternative option (fixed monthly fee regardless of usage)
} as const;

const WaterSource = {
  // Public/Municipal Supply
  WASA: 'wasa',             // Municipal Water Supply and Sewerage Authority
  GOVT_SUPPLY: 'govt_supply', // Generic term for any centralized government water line

  // Private/Groundwater Sources
  DEEP_TUBE_WELL: 'deep_tube_well', // Water sourced from a deep borewell
  SHALLOW_TUBE_WELL: 'shallow_tube_well', // Water sourced from a less deep borewell
  BOREWELL: 'borewell',             // General term for a bored well (can be deep or shallow)

  // Alternative/Natural Sources
  COMMUNITY_TANK: 'community_tank', // Water supplied from a shared tank or reservoir
  RAINWATER_HARVESTING: 'rainwater_harvesting', // System collects and stores rainwater
  SURFACE_WATER: 'surface_water',   // Water drawn from a river, lake, or pond (less common for residential use)

  // Other Status
  NONE: 'none',                     // No water source available
} as const;

export const Constants = {
  Operation_MESSAGES,
  STATUS,
  Approval,
  PropertyType,
  Availability,
  BoostLevel,
  Gas,
  Facing,
  ElectricityType,
  WaterSource
};
