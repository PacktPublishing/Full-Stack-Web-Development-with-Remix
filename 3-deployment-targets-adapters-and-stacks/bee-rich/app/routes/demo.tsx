import { ActionBar, Button } from '~/components/buttons';
import { Form, Input } from '~/components/forms';
import { H1, H2, H3, H4 } from '~/components/headings';
import { ButtonLink, Link } from '~/components/links';
import { Paragraph } from '~/components/texts';

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
      <section className="w-full flex flex-col gap-3 items-center justify-center">
        <Paragraph>
          Please find more useful information <Link to="/">here</Link>.
        </Paragraph>
      </section>
      <section className="w-full flex flex-col gap-3 items-center justify-center">
        <ActionBar>
          <ButtonLink to="/">To Homepage!</ButtonLink>
          <ButtonLink to="/" isPrimary>
            To Homepage (important)!
          </ButtonLink>
        </ActionBar>
      </section>
      <section className="w-full flex flex-col gap-3 items-center justify-center">
        <Form>
          <H3>Form</H3>
          <Input label="Email:" type="text" name="email" placeholder="bee.rich@email.com" />
          <Input label="Name:" type="text" name="name" placeholder="Mr. Bee Rich" />
          <Input label="Password:" type="password" name="password" />
          <Button type="submit" isPrimary>
            Submit!
          </Button>
        </Form>
      </section>
    </div>
  );
}
