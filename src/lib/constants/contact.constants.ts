export const CONTACT_CONSTANTS = {
  SENT_MESSAGE: "✓ message queued — reply usually within a day",
  DIRECT_LABEL: "DIRECT",
  FIELDS: {
    MAIL: { label: "mail", value: "hello@fatih.dev" },
    TZ: { label: "tz", value: "Amsterdam · CET" },
    NOTE: {
      label: "note",
      value: "For contract work, mention scope and timeline.",
    },
  },
  PLACEHOLDERS: {
    NAME: "name",
    EMAIL: "email",
    MESSAGE: "message",
  },
  SUBMIT_LABEL: "send ↵",
} as const;
