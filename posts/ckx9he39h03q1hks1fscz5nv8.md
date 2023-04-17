# Conditionally define TypeScript types using data

Thu Dec 16 2021 21:35:05 GMT+0000 (Coordinated Universal Time)
cuid: ckx9he39h03q1hks1fscz5nv8
slug: conditionally-define-typescript-types-using-data
cover: https://cdn.hashnode.com/res/hashnode/image/unsplash/oMpAz-DN-9I/upload/v1639626386171/lCRizmlFYN.jpeg
tags: javascript, typescript

---

# Premise

[TypeScript Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) are an awesome way to make some really powerful types based on other types in your code.

However, sometimes it is useful to create types based on actual data in your code, rather than type definitions.

What do I mean when I say data? Let's look at an example

```ts
const a = 'a'
const b = 'b'

// this does not work because `a` and `b` cannot
// be used in the conditional for a Type
type C = a === b ? string : boolean
```

The above example is trivial, but this pattern can be very useful when defining APIs for libraries. For example, the arguments for a method can be typed conditionally based on other argument values. As an example, let's consider a trivial method which concatenates strings to build a "meal":

```ts
type Food = "burger" | "pasta";
type Condiment = "mayo" | "mustard";
type Sauce = "marinara" | "pesto";

function buildMeal(food: Food, topping: Condiment | Sauce) {
  return [food, topping].join(" with ");
}
```

This works just fine, but it accepts combinations that you may not want to allow, such as

```ts
buildMeal("burger", "marinara");
buildMeal("pasta", "mayo");
```

Wouldn't it be nice if we could constrain the `topping` argument to only allow a `Condiment` when `food === 'burger'` and only allow a `Sauce` when `food === 'pasta'`?

Turns out, we can! Here's a simple example of how to do it - if you want to know more, read on!

```ts
// define classes for the different types of food
class Burger {
  name = "burger"; // `name` is data; note the `=`
  topping: "mayo" | "mustard"; // `topping` is a type; note the `:`
}

class Pasta {
  name = "pasta";
  topping: "marinara" | "pesto";
}

// Foods holds references to all our different types of food
const Foods = {
  burger: new Burger(),
  pasta: new Pasta(),
} as const;

type Food = keyof typeof Foods;

function buildMeal<T extends Food>(
  food: T,
  topping: typeof Foods[T]["topping"]
) {
  // You could use the `food` argument directly, or
  // you can reference data on the class like this.
  const name = Foods[food].name;
  return [name, topping].join(" with ");
}
```

![Demonstration of the Food conditional type](https://cdn.hashnode.com/res/hashnode/image/upload/v1639670909117/BClmQIPiF.gif)

(If the above gif doesn't load for you, check out [the direct link](https://cdn.hashnode.com/res/hashnode/image/upload/v1639670909117/BClmQIPiF.gif))

# Background

At [Quin](http://helloquin.com), we use a monorepo powered by [Nx](https://nx.dev/) to develop our primary API, PWA frontend, and serverless components (you can [read more about our tech stack here](https://ericyd.hashnode.dev/the-quin-tech-stack)). To bind all these together we have a substantial number of internal libraries we've written that handle everything from wrapping third-party APIs, to formatting event names (with the goal of better adherence to a standard [event naming framework](https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/) across our codebase).

Internal libraries are one of the most potent areas to impact the quality of your code. A thoughtful, easy-to-use library API can make it a breeze to implement functionality in disparate call sites across many services.

# The problem

A struggle that we have run into a few times when working with third-party APIs is the combination of data and type definitions. For example, let's say you want to interact with AWS SQS by pushing messages to a queue. Typically you will want at least two things

1. The `QueueUrl` of the SQS queue (data)
2. A contract for the shape of the data you are sending, so that consumers may know what to expect (types)

For a single queue, this is easily accomplished by defining the `QueueUrl` in some variable, and the type definition in a `type` or `interface`. But if the library is intended to interface with SQS in a generic way, how do you enforce types on the data while conveniently accessing the data (`QueueUrl`) that is required to make it work?

## Sample code

```ts
export class InternalSqsClient {
  // ... instantiate AWS SDK, etc

  async sendMessage(queueUrl: string, message: unknown) {
    // how do we force message to conform to a known type?
    // how do we make the message `type` dynamic based on
    // the queueUrl value?
    // (i.e. different queues will likely expect different contracts)
  }
}
```

Before you point out the obvious: yes, the AWS SQS SDK expects a `string` type for the `MessageBody` argument. The point here is that the library should be able to enforce a type definition for callers - stringifying an Object is trivial and should be delegated to the library anyway.

# A naïve solution

The simplest way to approach this problem is by putting the burden on the caller to know both the data and the type they need. A trivial example might look something like this (using the above defined `InternalSqsClient`)

```ts
const client = new InternalSqsClient();

await client.sendMessage(process.env.PAYMENT_QUEUE, {
  id: "my id",
  amount: 42.0,
});

// somewhere else in the code
await client.sendMessage(process.env.EMAIL_QUEUE, {
  to: "test@example.com",
  body: "welcome",
});
```

This works but has the unfortunate effect of requiring the caller to know

1. The data required to interact with SQS, and
2. The expected data structure for the message they are sending

We have to ask: is there much benefit to our custom wrapper if the caller still needs to know implementation details of the API with which they are interacting?

# A better way

TypeScript offers a plethora of ways to create and reference types based on both existing **data** and other **types**. However, there are very few structures that allow combining both data (e.g. a string literal such as a `QueueUrl`) with type definitions.

One way we can combine our data and types in a single unit of code is with a `class`.

For example, if we have two queues as shown in the code above, we might define two classes in our internal library like this

```ts
// a class allows us to combine both data and types in one construct,
// which we can reference in our method to constrain the type
// definition, as well as access the data from the class
class PaymentQueue {
  url = process.env.PAYMENT_QUEUE; // `url` is data; note the `=`
  message: {
    // `message` is a type; note the `:`
    id: string;
    amount: number;
  };
}

class EmailQueue {
  url = process.env.EMAIL_QUEUE;
  message: {
    to: string;
    body: string;
  };
}

// `Queues` is just a map of queue names to the queue "definitions",
// which in this case contain the QueueUrl (url) and message type.
// Note: the keys of `Queues` can be anything! They are intended
// to be useful, descriptive names that will be referenced by the caller
const Queues = {
  Email: new EmailQueue(),
  Payment: new PaymentQueue(),
} as const;
```

We can then exploit some TypeScript cleverness to define our arguments for the `sendMessage` method

```ts
// Queue is now a union of the keys of Queues; specifically
// 'Email' | 'Payment'
type Queue = keyof typeof Queues;

// Define a config object
type SendMessageConfig<T extends Queue> = {
  queue: T;
  // enhancement: you might want your classes to each
  // implement the same interface, to ensure this always works
  message: typeof Queues[T]["message"];
};

export class InternalSqsClient {
  // the method must accept a generic which gets resolved when the
  // user enters a value for `queue`
  async sendMessage<T extends Queue>(config: SendMessageConfig<T>) {
    // this property access works because
    // `url` is data defined on the class
    const queueUrl = Queues[config.queue].url;
    const message = config.message;

    // call SQS SDK with our data
  }
}
```

Benefits

1. Callers never need to know anything about the API - any TS editor will auto-complete the available names for `queue`
2. Callers will be forced to adhere to a specific structure for their `message` properties, and the enforced structure is dynamic based on their `queue`

## Example calling the new improved API

```ts
const client = new InternalSqsClient();

await client.sendMessage({
  queue: "Payment",
  message: {
    id: "my id",
    amount: 42.0,
  },
});

await client.sendMessage({
  queue: "Email",
  message: {
    to: "test@example.com",
    body: "welcome",
  },
});
```

Much nicer!

![Demonstration of Internal SQS client lib](https://cdn.hashnode.com/res/hashnode/image/upload/v1639689576170/CCuR4WTUT.gif)

(If the above gif doesn't load for you, check out [the direct link](https://cdn.hashnode.com/res/hashnode/image/upload/v1639689576170/CCuR4WTUT.gif))

# The uglier alternative

The savvy reader may be thinking "You haven't shown us anything new -- this is entirely possibly using Conditional Types!"

You're correct! Here's an example of doing the same thing using pure conditional types

```ts
type PaymentMessage = {
  id: string;
  amount: number;
};

type EmailMessage = {
  to: string;
  body: string;
};

type Message<T extends Queue> = T extends "Payment"
  ? PaymentMessage
  : EmailMessage;
```

Indeed, this works just fine. But what about for an arbitrary number of Queues? There are probably codegen tools that would make your life easier, but there is no general solution without manually adding a bunch of conditionals, e.g.

```ts
type Message<T extends Queue> = T extends "Payment"
  ? PaymentMessage
  : T extends "Email"
  ? EmailMessage
  : T extends "AddressUpdate"
  ? AddressUpdateMessage
  : T extends "LinkAccount"
  ? LinkAccountMessage
  : GenericMessage;
```

This solution might be the right choice in certain cases but I don't think it is as scalable, or as easy to read. Disagree? Let me know if the comments!

Another alternative could be to define you data and types in two places. This works, but has the unfortunate side-effect of de-coupling your data and types, rather than encapsulating them in one class. For example

```ts
const QueueUrls = {
  Payment: process.env.PAYMENT_QUEUE_URL,
  Email: process.env.EMAIL_QUEUE_URL,
} as const;

type QueueMessageTypes = {
  Payment: {
    id: string;
    amount: number;
  };
  Email: {
    to: string;
    body: string;
  };
};
```

You can use a very similar pattern as above to reference the correct types, but it is more brittle because the top-level properties of `QueueMessageTypes` must exactly equal the keys of `QueueUrls` or it won't work. Duplicating code leads to more possibilities of typos and bugs.

# Conclusion

TypeScript Conditional Types are great for building types from existing type definitions. But they do not allow you to use data to make decisions. By using some TypeScript magic we can define conditional types using real data in our application. Some benefits:

1. Declarative, encapsulated definitions for library values
2. Hide implementation details from callers
3. Expose useful, descriptive argument options to callers
4. Create generic APIs that can support a wide range of behaviors while enforcing correct static typing in all scenarios

Happy coding!
