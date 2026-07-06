import { COURSES } from "@/data/courses";
import { CoursePath } from "@/components/course/CoursePath";
import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
    return COURSES.map(c => ({ courseId: c.id }));
}

export default async function CoursePage({ params }: PageProps) {
    const { courseId } = await params;
    const course = COURSES.find(c => c.id === courseId);

    if (!course) {
        redirect("/");
    }

    return <CoursePath course={course} />;
}
