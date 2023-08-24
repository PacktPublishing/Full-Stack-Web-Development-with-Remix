import { ActionBar, Button } from '~/components/buttons';
import { Card } from '~/components/containers';
import { Form, Input, Textarea } from '~/components/forms';
import { H1, H2, H3, H4 } from '~/components/headings';
import { ButtonLink, FloatingActionLink, Link } from '~/components/links';
import { InlineError, Paragraph } from '~/components/texts';

export default function Component() {
  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center mb-20">
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
      <section className="w-full">
        <Form>
          <H3>Form</H3>
          <Input label="Email:" type="text" name="email" placeholder="bee.rich@email.com" />
          <Input label="Name:" type="text" name="name" placeholder="Mr. Bee Rich" />
          <Textarea label="Note:" name="note" />
          <Input label="Password:" type="password" name="password" />
          <Button type="submit" isPrimary>
            Submit!
          </Button>
        </Form>
      </section>
      <section className="w-full">
        <Card>
          <H3>Card</H3>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec consectetur tincidunt, nunc
            nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Sed euismod, nisl nec consectetur tincidunt, nunc nisl
            aliquam nisl, eget aliquam nisl nunc vel nisl.
          </Paragraph>
        </Card>
      </section>
      <section className="w-full">
        <Card>
          <Form>
            <H3>Card with Form</H3>
            <Input label="Email:" type="text" name="email" placeholder="bee.rich@email.com" />
            <Input label="Password:" type="password" name="password" />
            <Button type="submit" isPrimary>
              Submit!
            </Button>
          </Form>
        </Card>
      </section>
      <section className="w-full">
        <Form>
          <H3>Form with Error</H3>
          <Input label="Email:" type="text" name="email" placeholder="bee.rich@email.com" />
          <InlineError>Wupsi, Email already taken. Could that be you?</InlineError>
          <Button type="submit" isPrimary>
            Submit!
          </Button>
        </Form>
      </section>
      <FloatingActionLink to="/demo">Primary action</FloatingActionLink>
    </div>
  );
}
