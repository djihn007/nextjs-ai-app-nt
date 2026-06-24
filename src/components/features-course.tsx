import Image from "next/image";
import type { Course } from "@/services/course.service";

type Props = {
  courses: Course[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="mx-auto text-center text-2xl font-bold tracking-[-0.025em] text-[#423D38]">
          Courses
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-[#797067]">
          Browse available security and development courses
        </p>
        <div className="mt-18 grid w-full gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              className="flex w-full flex-col text-start"
              key={course.title}
            >
              <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-md sm:mb-6">
                <Image
                  alt={course.title}
                  className="size-full bg-[#EDEBE9] object-cover"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                  loading="eager"
                />
              </div>
              <div className="px-1">
                <span className="text-lg font-bold tracking-[-0.015em]">
                  {course.title}
                </span>
                <p className="mt-1 max-w-[25ch] text-sm leading-relaxed text-[#797067]">
                  {course.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCourse;
