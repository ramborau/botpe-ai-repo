/**
 * Bot conversation stages
 */
export enum BotStage {
  INITIAL = 'INITIAL',
  DEPARTMENT_SELECTED = 'DEPARTMENT_SELECTED',
  LOCATION_RECEIVED = 'LOCATION_RECEIVED',
  HOSPITAL_SELECTED = 'HOSPITAL_SELECTED',
  DOCTOR_SELECTED = 'DOCTOR_SELECTED',
  DATE_SELECTED = 'DATE_SELECTED',
  SLOT_SELECTED = 'SLOT_SELECTED',
}

/**
 * User's bot session state
 */
export interface BotState {
  stage: BotStage;
  fullName: string;
  firstName: string;
  selections: {
    department?: string;
    location?: { latitude: number; longitude: number };
    hospital?: string;
    doctor?: string;
    date?: string;
    timeSlot?: string;
  };
  lastMessageType?: 'list' | 'location_request';
}

/**
 * List item structure from JSON
 */
export interface ListItem {
  title: string;
  subtitle: string;
}

/**
 * Bot data structure from JSON
 */
export interface BotData {
  hospital_name: string;
  departments: ListItem[];
  locations: ListItem[];
  doctors: ListItem[];
  dates: ListItem[];
  time_slots: ListItem[];
}
