/**
 * GlowBiz Solutions — Central WhatsApp Configuration & Helper Utility
 * 
 * Centralized, single-source-of-truth configuration for all WhatsApp interactions.
 * If the official phone number changes, update it here once.
 */

// Official GlowBiz WhatsApp phone number (country code + number without +, spaces, brackets, or dashes)
// Configuration placeholder ready for exact production SIM assignment
export const GLOWBIZ_WHATSAPP_CONFIG = {
  // Format: country code + subscriber number (e.g., 971585515130)
  phoneNumber: '971585515130',
  displayNumber: '0585515130',
  internationalDisplayNumber: '+971 58 551 5130',
  defaultMessage: 'Hello GlowBiz, I would like to discuss my UAE requirements and understand how you can assist me.',
  topicMessages: {
    general: 'Hello GlowBiz, I would like to discuss my UAE requirements and understand how you can assist me.',
    business: 'Hello GlowBiz, I would like to discuss UAE company setup, licensing jurisdictions and business structuring.',
    banking: 'Hello GlowBiz, I would like to discuss UAE banking readiness, KYC preparation and corporate account options.',
    residency: 'Hello GlowBiz, I would like to discuss UAE residency pathways and Golden Visa options.',
    investment: 'Hello GlowBiz, I would like to discuss UAE investment and real estate considerations within my objectives.',
    family: 'Hello GlowBiz, I would like to discuss long-term family planning, succession, wills and wealth protection.'
  }
};

/**
 * Builds the direct WhatsApp web/app link with properly encoded message.
 * Does not send the message automatically; loads the pre-filled prompt into the user's chat input.
 *
 * @param {string} [topicKey='general'] - Specific discussion topic key
 * @param {string} [customText] - Optional custom override message
 * @returns {string} Fully encoded WhatsApp URL
 */
export function getWhatsAppUrl(topicKey = 'general', customText = null) {
  const number = GLOWBIZ_WHATSAPP_CONFIG.phoneNumber.replace(/[^0-9]/g, '');
  const messageText = customText || GLOWBIZ_WHATSAPP_CONFIG.topicMessages[topicKey] || GLOWBIZ_WHATSAPP_CONFIG.defaultMessage;
  const encoded = encodeURIComponent(messageText);
  return `https://wa.me/${number}?text=${encoded}`;
}
