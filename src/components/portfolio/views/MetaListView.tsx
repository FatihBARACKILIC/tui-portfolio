import { FadeUp } from "@/components/portfolio/ui/FadeUp";
import { ListRow } from "@/components/portfolio/ui/ListRow";
import { withStagger } from "@/lib/helpers/stagger";

type MetaItem = {
  key: string;
  title: string;
  meta: string;
  date: string;
};

type SocialItem = {
  key: string;
  href: string;
  icon: string;
  label: string;
  handle: string;
};

type MetaProperties = {
  variant?: "meta";
  items: readonly MetaItem[];
  baseDelay?: number;
};

type SocialProperties = {
  variant: "social";
  items: readonly SocialItem[];
  baseDelay?: number;
};

export type MetaListViewProps = MetaProperties | SocialProperties;

export const MetaListView = (properties: MetaListViewProps) => {
  const baseDelay = properties.baseDelay ?? 60;

  if (properties.variant === "social") {
    const items = withStagger(properties.items, baseDelay);
    return (
      <div>
        {items.map((item) => (
          <FadeUp key={item.key} delayMs={item.delayMs}>
            <ListRow
              variant="social"
              href={item.href}
              icon={item.icon}
              label={item.label}
              handle={item.handle}
            />
          </FadeUp>
        ))}
      </div>
    );
  }

  const items = withStagger(properties.items, baseDelay);
  return (
    <div>
      {items.map((item) => (
        <FadeUp key={item.key} delayMs={item.delayMs}>
          <ListRow title={item.title} meta={item.meta} date={item.date} />
        </FadeUp>
      ))}
    </div>
  );
};
