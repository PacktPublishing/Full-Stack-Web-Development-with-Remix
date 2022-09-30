import { ActionBar, Button } from '~/components/buttons';
import { H1, H2, H3, H4 } from '~/components/headings';

export default function DemoPage() {
  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center">
      <section className="w-full flex flex-col gap-3 items-center justify-center">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
      </section>
      <section className="w-full flex flex-col gap-3 items-center justify-center">
        <ActionBar>
          <Button>Click me!</Button>
          <Button isPrimary>No, click me!</Button>
        </ActionBar>
      </section>
    </div>
  );
}
