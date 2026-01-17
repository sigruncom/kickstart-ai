import type { User } from '../types';

const names = ["Jane Doe", "Marcus Smith", "Anna Lindberg", "Hiroshi Kobayashi", "Alex Bennett", "Amy Crane", "Andrew Proctor", "Bianca Rose", "Björn Salvador", "Catherine Lee", "David Chen", "Elena Rodriguez", "Fiona Gallagher", "George Miller", "Hannah Abbott", "Ian Wright", "Julia Roberts", "Kevin Hart", "Linda Evans", "Michael Scott", "Nina Simone", "Oscar Isaac", "Peter Parker", "Quinn Fabray", "Rachel Green", "Steve Rogers", "Tony Stark", "Bruce Wayne", "Clark Kent", "Diana Prince"];
const emails = ["jane.doe@example.com", "m.smith@somba.ai", "anna.l@icloud.com", "hiro@design.jp", "alex.b@hotmail.com", "amy@socialmarketing.com", "andrew.p@live.co.uk", "bianca@somba.ai", "bjorn.s@gmail.com", "c.lee@somba.ai", "d.chen@tech.com", "elena.r@global.net", "fiona@gallagher.ie", "george@millers.com", "hannah@somba.ai", "ian.w@outlook.com", "julia.r@acting.com", "k.hart@comedy.org", "linda@evans.com", "m.scott@dundermifflin.com", "nina@soul.com", "oscar@isaac.net", "peter@dailybugle.com", "quinn@cheer.com", "rachel@ralphlauren.com", "s.rogers@avengers.com", "t.stark@stark.com", "b.wayne@wayne.com", "c.kent@dailyplanet.com", "d.prince@themyscira.com"];
const roles = ["admin", "student", "coach", "student", "admin", "student", "student", "coach", "student", "student", "admin", "student", "coach", "student", "student", "admin", "student", "student", "coach", "admin", "student", "student", "student", "coach", "student", "admin", "coach", "admin", "student", "coach"];
const statuses = ["active", "active", "inactive", "pending", "active", "inactive", "active", "active", "inactive", "active", "active", "pending", "active", "inactive", "active", "active", "active", "pending", "active", "active", "inactive", "active", "active", "active", "active", "active", "active", "active", "active", "pending"];
const dates = ["Oct 12, 2023", "Oct 15, 2023", "Sep 28, 2023", "Nov 02, 2023", "Oct 20, 2023"];
const expDates = ["Oct 12, 2024", "Oct 15, 2024", "Sep 28, 2024", "Nov 02, 2024", "Oct 20, 2024"];

export const mockUsers: User[] = names.map((name, i) => {
    const [first, ...rest] = name.split(' ');
    const last = rest.join(' ');
    return {
        id: `user-${i}`,
        firstName: first,
        lastName: last,
        email: emails[i],
        role: roles[i] as any,
        status: statuses[i] as any,
        dateJoined: dates[i % dates.length],
        expirationDate: expDates[i % expDates.length],
    };
});
