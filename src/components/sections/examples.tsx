import React from 'react';
import { TimelineLayout } from '@/components/timeline';
import { Calendar } from 'lucide-react';
import { timelineData } from '@/app/data';
import { ExampleCard } from './example-card';

const examples = {
  basic: {
    name: 'Basic',
    code: `<TimelineLayout items={timelineData} size="md" />`,
    component: <TimelineLayout items={timelineData} size="md" />,
  },
  customIcon: {
    name: 'Custom Icon',
    code: `<TimelineLayout items={timelineData} size="lg" iconColor="primary" customIcon={<CalendarIcon />} />`,
    component: (
      <TimelineLayout
        items={timelineData}
        size="lg"
        iconColor="primary"
        customIcon={<Calendar />}
      />
    ),
  },
  animated: {
    name: 'Animated',
    code: `<TimelineLayout items={timelineData} size="md" animate={true} />`,
    component: <TimelineLayout items={timelineData} size="md" animate={true} />,
  },
};

export function Examples() {
  return (
    <section id="examples" className="space-y-6">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Examples</h2>
      <div className="grid gap-6">
        {Object.entries(examples).map(([key, example]) => (
          <ExampleCard key={key} {...example} />
        ))}
      </div>
    </section>
  );
}