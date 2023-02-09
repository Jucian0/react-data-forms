const feature = [
  {
    title: 'Debounced',
    description:
      'The debounce parameter delays the updating of the state until the user has stopped changing inputs for a predetermined amount of time.',
  },
  {
    title: 'OnChange',
    description:
      'This form mode, allow to create a form that will update the inputs state whenever the user type something in the fields.',
  },
  {
    title: 'OnSubmit',
    description:
      "Fullfil all fields, nad submit it with just one render, it's the most performative way to create a form.",
  },

  {
    title: 'Inline validation',
    description:
      'Pass a value schema in register function as a param to have a inline validation.',
  },
  {
    title: 'Dot notation',
    description:
      'Use dot notation to access nested values in form objects, or to register a field.',
  },
  {
    title: 'More',
    description:
      'you can find more valuable feature reading the complete documentation...',
  },
];

export default function Features() {
  return (
    <div className="container mx-auto mt-20">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight  sm:text-4xl">
          Createform features
        </h2>
      </div>

      <div className="flex container justify-center flex-wrap gap-y-2 gap-x-2">
        {feature.map((item) => (
          <div
            key={item.title}
            className="px-3 lg:px-3 py-3 justify-center flex"
          >
            <div className="max-w-sm p-6 ">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-800 lg:my-8" /> */}
    </div>
  );
}
