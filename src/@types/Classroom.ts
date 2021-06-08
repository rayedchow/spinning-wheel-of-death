export interface Course {
	id: string
	name: string
	ownerId: string
	courseState: CourseState
	section?: string
	descriptionHeading?: string
	room?: string
};

export interface Student {
	courseId: string
	userId: string
	profile: StudentProfile
}

interface StudentProfile {
	id: string
	name: {
		givenName: string
		fullName: string
	}
}

type CourseState = "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED";