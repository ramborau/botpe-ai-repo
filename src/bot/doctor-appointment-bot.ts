import * as fs from 'fs';
import * as path from 'path';
import { sendInteractiveListMessage2, sendLocationRequestMessage2, sendCTAUrlButtonMessage2, sendTextMessage2 } from '../messages/index2';
import { BotStage, BotState, BotData, ListItem } from './types';

// In-memory state storage (for production, use Redis or database)
const userStates = new Map<string, BotState>();

// Load bot data from JSON
const botDataPath = path.join(__dirname, '../../doctor_appointment_bot.json');
const botData: BotData = JSON.parse(fs.readFileSync(botDataPath, 'utf-8'));

/**
 * Extract user name from contact info
 */
function extractUserNames(contactName: string): { fullName: string; firstName: string } {
  const fullName = contactName || 'there';
  const firstName = fullName.split(' ')[0];
  return { fullName, firstName };
}

/**
 * Send typing indicator and wait
 */
async function simulateTyping(phoneNumber: string, delayMs: number = 1500): Promise<void> {
  // For now, just wait. Typing indicator requires message_id which we don't have in bot context
  await new Promise(resolve => setTimeout(resolve, delayMs));
}

/**
 * Create list message from items
 */
function createListMessage(items: ListItem[], header: string, body: string, buttonText: string) {
  return {
    header: { type: 'text' as const, text: header },
    body: { text: body },
    action: {
      button: buttonText,
      sections: [
        {
          rows: items.map((item, index) => ({
            id: `${index}`,
            title: item.title,
            description: item.subtitle,
          })),
        },
      ],
    },
  };
}

/**
 * Handle trigger "dr1" - Initialize conversation
 */
async function handleInitial(phoneNumber: string, contactName: string): Promise<void> {
  const { fullName, firstName } = extractUserNames(contactName);

  // Create new bot state
  const state: BotState = {
    stage: BotStage.INITIAL,
    fullName,
    firstName,
    selections: {},
    lastMessageType: 'list',
  };
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber);

  // Send department selection list
  const listMessage = createListMessage(
    botData.departments,
    `${botData.hospital_name}`,
    `Hello ${fullName}! 👋\n\nWelcome to ${botData.hospital_name}. I'm here to help you book a doctor's appointment.\n\nWhich department would you like to consult?`,
    'Select Department'
  );

  await sendInteractiveListMessage2(phoneNumber, listMessage);
}

/**
 * Handle department selection
 */
async function handleDepartmentSelection(phoneNumber: string, selectedId: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  const selectedDept = botData.departments[parseInt(selectedId)];
  state.selections.department = selectedDept.title;
  state.stage = BotStage.DEPARTMENT_SELECTED;
  state.lastMessageType = 'location_request';
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber);

  // Request location
  await sendLocationRequestMessage2(
    phoneNumber,
    `Great choice, ${state.firstName}! 🏥\n\nTo find the nearest ${selectedDept.title} specialists, please share your current location.`
  );
}

/**
 * Handle location sharing
 */
async function handleLocationSharing(phoneNumber: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  state.stage = BotStage.LOCATION_RECEIVED;
  state.lastMessageType = 'list';
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber, 2000);

  // Send hospitals list (sorted to appear nearest)
  const listMessage = createListMessage(
    botData.locations,
    'Nearby Hospitals',
    `Perfect! 📍\n\nHere are the nearest ${botData.hospital_name} hospitals with ${state.selections.department} specialists:`,
    'Select Hospital'
  );

  await sendInteractiveListMessage2(phoneNumber, listMessage);
}

/**
 * Handle hospital selection
 */
async function handleHospitalSelection(phoneNumber: string, selectedId: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  const selectedHospital = botData.locations[parseInt(selectedId)];
  state.selections.hospital = selectedHospital.title;
  state.stage = BotStage.HOSPITAL_SELECTED;
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber, 2000);

  // Send doctors list
  const listMessage = createListMessage(
    botData.doctors,
    'Available Doctors',
    `Excellent! 👨‍⚕️\n\nHere are the ${state.selections.department} doctors available at ${selectedHospital.title}:`,
    'Select Doctor'
  );

  await sendInteractiveListMessage2(phoneNumber, listMessage);
}

/**
 * Handle doctor selection
 */
async function handleDoctorSelection(phoneNumber: string, selectedId: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  const selectedDoctor = botData.doctors[parseInt(selectedId)];
  state.selections.doctor = selectedDoctor.title;
  state.stage = BotStage.DOCTOR_SELECTED;
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber, 1500);

  // Send dates list
  const listMessage = createListMessage(
    botData.dates,
    'Available Dates',
    `Perfect choice! 📅\n\nWhen would you like to book your appointment with ${selectedDoctor.title}?`,
    'Select Date'
  );

  await sendInteractiveListMessage2(phoneNumber, listMessage);
}

/**
 * Handle date selection
 */
async function handleDateSelection(phoneNumber: string, selectedId: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  const selectedDate = botData.dates[parseInt(selectedId)];
  state.selections.date = selectedDate.title;
  state.stage = BotStage.DATE_SELECTED;
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber, 1500);

  // Send time slots list
  const listMessage = createListMessage(
    botData.time_slots,
    'Available Time Slots',
    `Great! ⏰\n\nPlease select your preferred time slot for ${selectedDate.title}:`,
    'Select Time'
  );

  await sendInteractiveListMessage2(phoneNumber, listMessage);
}

/**
 * Handle time slot selection - Final booking summary
 */
async function handleTimeSlotSelection(phoneNumber: string, selectedId: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  const selectedSlot = botData.time_slots[parseInt(selectedId)];
  state.selections.timeSlot = selectedSlot.title;
  state.stage = BotStage.SLOT_SELECTED;
  userStates.set(phoneNumber, state);

  await simulateTyping(phoneNumber, 2000);

  // Send booking summary with CTA button
  const summaryText = `🎉 Appointment Confirmed!\n\n*Patient:* ${state.fullName}\n*Department:* ${state.selections.department}\n*Hospital:* ${state.selections.hospital}\n*Doctor:* ${state.selections.doctor}\n*Date:* ${state.selections.date}\n*Time:* ${state.selections.timeSlot}\n\nYour appointment has been booked successfully! Click below to view details and download your appointment slip.`;

  await sendCTAUrlButtonMessage2(phoneNumber, {
    body: { text: summaryText },
    action: {
      name: 'cta_url',
      parameters: {
        display_text: 'View Appointment',
        url: 'https://botpe.in/',
      },
    },
  });

  // Clear state after completion
  userStates.delete(phoneNumber);
}

/**
 * Handle invalid input (text when expecting selection)
 */
async function handleInvalidInput(phoneNumber: string): Promise<void> {
  const state = userStates.get(phoneNumber);
  if (!state) return;

  await simulateTyping(phoneNumber, 800);

  // Resend last message based on stage
  if (state.lastMessageType === 'list') {
    let listMessage;
    let errorPrefix = `${state.firstName}, please select from the options below:\n\n`;

    switch (state.stage) {
      case BotStage.INITIAL:
        listMessage = createListMessage(
          botData.departments,
          `${botData.hospital_name}`,
          `${errorPrefix}Which department would you like to consult?`,
          'Select Department'
        );
        break;

      case BotStage.LOCATION_RECEIVED:
        listMessage = createListMessage(
          botData.locations,
          'Nearby Hospitals',
          `${errorPrefix}Here are the nearest hospitals:`,
          'Select Hospital'
        );
        break;

      case BotStage.HOSPITAL_SELECTED:
        listMessage = createListMessage(
          botData.doctors,
          'Available Doctors',
          `${errorPrefix}Here are the available doctors:`,
          'Select Doctor'
        );
        break;

      case BotStage.DOCTOR_SELECTED:
        listMessage = createListMessage(
          botData.dates,
          'Available Dates',
          `${errorPrefix}Please select a date:`,
          'Select Date'
        );
        break;

      case BotStage.DATE_SELECTED:
        listMessage = createListMessage(
          botData.time_slots,
          'Available Time Slots',
          `${errorPrefix}Please select a time slot:`,
          'Select Time'
        );
        break;
    }

    if (listMessage) {
      await sendInteractiveListMessage2(phoneNumber, listMessage);
    }
  } else if (state.lastMessageType === 'location_request') {
    await sendLocationRequestMessage2(
      phoneNumber,
      `${state.firstName}, please share your location using the button below so I can find the nearest hospitals for you. 📍`
    );
  }
}

/**
 * Main bot handler
 */
export async function handleDoctorAppointmentBot(
  phoneNumber: string,
  messageType: string,
  messageBody: any,
  contactName: string
): Promise<void> {
  try {
    // Check for trigger "dr1"
    if (messageType === 'text' && messageBody?.body?.toLowerCase() === 'dr1') {
      await handleInitial(phoneNumber, contactName);
      return;
    }

    // Get current state
    const state = userStates.get(phoneNumber);
    if (!state) {
      // No active session, ignore
      return;
    }

    // Handle based on message type and current stage
    if (messageType === 'interactive') {
      const listReply = messageBody.list_reply;
      if (!listReply) return;

      const selectedId = listReply.id;

      switch (state.stage) {
        case BotStage.INITIAL:
          await handleDepartmentSelection(phoneNumber, selectedId);
          break;

        case BotStage.LOCATION_RECEIVED:
          await handleHospitalSelection(phoneNumber, selectedId);
          break;

        case BotStage.HOSPITAL_SELECTED:
          await handleDoctorSelection(phoneNumber, selectedId);
          break;

        case BotStage.DOCTOR_SELECTED:
          await handleDateSelection(phoneNumber, selectedId);
          break;

        case BotStage.DATE_SELECTED:
          await handleTimeSlotSelection(phoneNumber, selectedId);
          break;
      }
    } else if (messageType === 'location' && state.stage === BotStage.DEPARTMENT_SELECTED) {
      // User shared location
      await handleLocationSharing(phoneNumber);
    } else if (messageType === 'text') {
      // Invalid text input during conversation
      await handleInvalidInput(phoneNumber);
    }
  } catch (error) {
    console.error('Error in doctor appointment bot:', error);
  }
}

/**
 * Check if user has active bot session
 */
export function hasActiveSession(phoneNumber: string): boolean {
  return userStates.has(phoneNumber);
}
