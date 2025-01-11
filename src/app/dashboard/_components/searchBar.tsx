export default function SearchBar() {
  return (
    <>
<div className=" ">
  <div className="flex ">
  <form className="flex mr-6">
    <label htmlFor="quiz-search" className="sr-only">Search</label>
    <div className="relative mr-6">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-[21.12px] h-[21.12px] text-[#1935CA]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="text"
        id="quiz-search"
        className=""
        placeholder="Search Quiz"
        required
      />
    </div>
    <button type="submit" className="w-[191px] h-[61px] px-8 py-4 rounded-[20px] bg-[#4461F2] text-white text-xl font-semibold">
      Start Quiz
    </button>
  </form>
  </div>
</div>
    </>
  )
}
