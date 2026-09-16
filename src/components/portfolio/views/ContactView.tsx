import { Button } from "@/components/portfolio/ui/Button";
import { Field } from "@/components/portfolio/ui/Field";
import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { Rule } from "@/components/portfolio/ui/Rule";
import { CONTACT_CONSTANTS } from "@/lib/constants/contact.constants";

type ContactViewProperties = {
  sent: boolean;
  cName: string;
  cEmail: string;
  cMsg: string;
  onName: (value: string) => void;
  onEmail: (value: string) => void;
  onMsg: (value: string) => void;
  onSubmit: () => void;
};

export const ContactView = ({
  sent,
  cName,
  cEmail,
  cMsg,
  onName,
  onEmail,
  onMsg,
  onSubmit,
}: ContactViewProperties) => {
  const { FIELDS } = CONTACT_CONSTANTS;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6.5">
      <FadeUp delayMs={60}>
        {sent ? (
          <div className="border-ok text-ok border px-4 py-3.5 text-[0.82rem]">
            {CONTACT_CONSTANTS.SENT_MESSAGE}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <Field
              type="text"
              value={cName}
              onChange={(event) => onName(event.target.value)}
              placeholder={CONTACT_CONSTANTS.PLACEHOLDERS.NAME}
            />
            <Field
              type="email"
              value={cEmail}
              onChange={(event) => onEmail(event.target.value)}
              placeholder={CONTACT_CONSTANTS.PLACEHOLDERS.EMAIL}
            />
            <Field
              multiline
              rows={5}
              value={cMsg}
              onChange={(event) => onMsg(event.target.value)}
              placeholder={CONTACT_CONSTANTS.PLACEHOLDERS.MESSAGE}
            />
            <Button variant="accent" className="self-start" onClick={onSubmit}>
              {CONTACT_CONSTANTS.SUBMIT_LABEL}
            </Button>
          </div>
        )}
      </FadeUp>

      <FadeUp delayMs={130}>
        <Rule label={CONTACT_CONSTANTS.DIRECT_LABEL} className="mb-3" />
        <div className="mb-1.75 flex gap-3 text-[0.82rem]">
          <span className="text-muted w-14 shrink-0">{FIELDS.MAIL.label}</span>
          <span>{FIELDS.MAIL.value}</span>
        </div>
        <div className="mb-1.75 flex gap-3 text-[0.82rem]">
          <span className="text-muted w-14 shrink-0">{FIELDS.TZ.label}</span>
          <span>{FIELDS.TZ.value}</span>
        </div>
        <div className="flex gap-3 text-[0.82rem]">
          <span className="text-muted w-14 shrink-0">{FIELDS.NOTE.label}</span>
          <span className="text-muted flex-auto text-pretty">
            {FIELDS.NOTE.value}
          </span>
        </div>
      </FadeUp>
    </div>
  );
};
