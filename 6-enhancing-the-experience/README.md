# 6. Enhancing the Experience

In this chapter, we will expand on the functionality from the previous chapter and further enhance the user experience with Remix's primitives, conventions, and levers.

## Getting started

We need to update the `ListLinkItem` component to support deleting items from the list.

If you want to reuse the code from the previous chapter, then follow the following guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 6, Enhancing the Experience_.

## Updating the `ListLinkItem` component

1. **Open `app/components/links.tsx` in your editor**

2. **Import the `Form` component and the `FormProps` type from `@remix-run/react`**

```diff
import { clsx } from 'clsx';
+ import type { FormProps, LinkProps as RemixLinkProps } from '@remix-run/react';
+ import { Form } from '@remix-run/react';
import { Link as RemixLink, NavLink as RemixNavLink } from '@remix-run/react';
import type { HTMLAttributes } from 'react';
```

3. **Update the `ListLinkItemProps` type**

Copy the following code and replace the existing `ListLinkItemProps` type:

```typescript
type DeleteProps = {
  ariaLabel: string;
  action: FormProps["action"];
};

type ListLinkItemProps = HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
  to: string;
  isActive?: boolean;
  deleteProps?: DeleteProps;
};
```

We update the `ListLinkItemProps` type to support a `deleteProps` property that is of type `DeleteProps`.

We also add a `isActive` property to the `ListLinkItemProps` type to style the active/current item differently.

4. **Replace the `ListLinkItem` component**

Copy the following code and replace the existing `ListLinkItem` component:

```typescript
export function ListLinkItem({
  isActive,
  className = "",
  to,
  deleteProps,
  children,
  ...props
}: ListLinkItemProps) {
  return (
    <li
      className={clsx(
        "w-full flex flex-row items-center border",
        isActive
          ? "bg-secondary dark:bg-darkSecondary border-secondary dark:border-darkSecondary"
          : "hover:bg-backgroundPrimary dark:hover:bg-darkBackgroundPrimary border-background dark:border-darkBackground hover:border-secondary dark:hover:border-darkSecondary",
        className
      )}
      {...props}
    >
      <RemixNavLink
        to={to}
        className={clsx("block w-full p-4", isActive && "pointer-events-none")}
      >
        {children}
      </RemixNavLink>
      {deleteProps && (
        <Form className="p-8 ml-auto" method="post" action={deleteProps.action}>
          <button
            type="submit"
            className="hover:text-primary focus:text-primary dark:hover:text-darkPrimary dark:focus:text-darkPrimary"
            aria-label={deleteProps.ariaLabel}
          >
            <svg className="w-8 h-8 " viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Form>
      )}
    </li>
  );
}
```

The updated `ListLinkItem` component supports the deletion of the item by rendering a `Form` component. The `Form` component is rendered only if the `deleteProps` property is provided. The `deleteProps` property contains information for the expense deletion form.

We further updated the styling of the component. Previously, we used the `className` property of Remix's `NavLink` component for styling. Now, we use the `isActive` property to style the active/current item differently.

Note that we will update the `ListLinkItem` component further in _Chapter 6, Enhancing the Experience_.

**Great!** 🥳 We are all set! 🎉

Dive into _Chapter 6, Enhancing the Experience_ now!
