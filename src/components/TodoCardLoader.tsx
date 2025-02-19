export const TodoCardLoader = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-[14px] px-5 flex items-center">
          <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-light-light-grayish-blue mr-3" />
          <div className="h-[20px] w-full animate-pulse bg-neutral-light-light-grayish-blue rounded-sm flex-1" />
        </div>
      ))}

      <div className="py-[14px] px-5 flex items-center">
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-light-light-grayish-blue mr-3" />
        <div className="h-[20px] w-full animate-pulse bg-neutral-light-light-grayish-blue rounded-sm flex-1" />
      </div>
      <div className="flex items-center justify-between py-[14px] px-5">
        <div className="h-[16px] w-20 animate-pulse bg-neutral-light-light-grayish-blue rounded-sm" />
        <div className="h-[16px] w-20 animate-pulse bg-neutral-light-light-grayish-blue rounded-sm" />
        <div className="h-[16px] w-20 animate-pulse bg-neutral-light-light-grayish-blue rounded-sm" />
      </div>
    </>
  );
};
