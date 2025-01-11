import { getAllSubjectsAction } from '@/lib/actions/subjects.action';
import Image from 'next/image';
import Link from 'next/link';

export async function Subjects() {
  // Fetch subjects data
  const subjects = await getAllSubjectsAction();

  return (

    <div className="lg:w-[1063px] bg-white rounded-[20px] py-8 px-4 shadow-[0px_15px_40px_0px_rgba(0,0,0,0.05)] mb-9">
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h4 className='font-medium text-[#4461F2] text-[24px]'>Quizzes</h4>
            <h4 className='font-medium text-[#4461F2] text-[24px]'>View all</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subjects.map((subject) => (
        <div key={subject._id} className="rounded-[8.44px]">
          <Link href={`/dashboard/exams?subject=${subject._id}`}>
            <div className="relative">
              {subject?.icon ? (
                <Image
                  src={subject.icon}
                  alt={subject.name || "Subject"}
                  width={330}
                  height={293}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white">
                  No Icon
                </div>
              )}
              <div
                className="absolute w-[276.14px] h-[66.03px] rounded-[8.44px] top-[199.78px] left-[27.01px] px-[15.1px] pt-[11px]"
                style={{
                  background: 'rgba(25, 53, 202, 0.4)',
                  backdropFilter: 'blur(27.01353645324707px)',
                }}
              >
                <span className="text-[13.51px] font-bold text-white">{subject.name}</span>
                <p className="text-[11.82px] font-medium text-white">
                  Voluptatem aut ut dignissimos blanditiis
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
        </div>
  </div>
  );
}
