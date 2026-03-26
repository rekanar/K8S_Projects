-- Vignan School Database Initialization
-- ========================================

CREATE TABLE IF NOT EXISTS school_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    motto VARCHAR(500),
    established_year INTEGER,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    principal VARCHAR(200),
    board VARCHAR(50),
    description TEXT
);

CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(100),
    department VARCHAR(100),
    qualification VARCHAR(200),
    experience_years INTEGER,
    phone VARCHAR(20),
    photo_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    roll_number VARCHAR(20) UNIQUE,
    class VARCHAR(10),
    section VARCHAR(5),
    date_of_birth DATE,
    parent_name VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    admission_year INTEGER
);

CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) UNIQUE,
    description TEXT,
    class VARCHAR(10),
    teacher_id INTEGER REFERENCES teachers(id),
    credits INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    content TEXT,
    date DATE DEFAULT CURRENT_DATE,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal'
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    event_date DATE,
    location VARCHAR(200),
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    student_name VARCHAR(200),
    year INTEGER,
    category VARCHAR(50)
);

-- ========================================
-- SEED DATA
-- ========================================

-- School Info
INSERT INTO school_info (name, motto, established_year, address, city, state, phone, email, website, principal, board, description)
VALUES (
    'Vignan School',
    'Igniting Minds, Inspiring Futures',
    1995,
    'Survey No. 123, Madinaguda',
    'Hyderabad',
    'Telangana',
    '+91-40-2304-5678',
    'info@vignanschools.org',
    'https://vignanschools.org',
    'Dr. Rajesh Kumar Sharma',
    'CBSE',
    'Vignan School, established in 1995, is one of the premier educational institutions in Hyderabad. Spread across a 15-acre campus with futuristic classrooms and state-of-the-art infrastructure, we provide education with a profound base in academics, experiential learning, and innovative thinking. Our mission is to nurture well-rounded individuals who excel in academics, sports, and extracurricular activities.'
);

-- Teachers
INSERT INTO teachers (name, email, department, qualification, experience_years, phone) VALUES
('Dr. Anitha Reddy', 'anitha.reddy@vignan.edu', 'Mathematics', 'Ph.D. Mathematics', 18, '+91-9876543201'),
('Mr. Venkat Rao', 'venkat.rao@vignan.edu', 'Physics', 'M.Sc. Physics, B.Ed', 15, '+91-9876543202'),
('Mrs. Lakshmi Devi', 'lakshmi.devi@vignan.edu', 'Chemistry', 'M.Sc. Chemistry, B.Ed', 12, '+91-9876543203'),
('Mr. Suresh Kumar', 'suresh.kumar@vignan.edu', 'English', 'M.A. English Literature', 14, '+91-9876543204'),
('Mrs. Priya Sharma', 'priya.sharma@vignan.edu', 'Biology', 'M.Sc. Biotechnology', 10, '+91-9876543205'),
('Mr. Ravi Teja', 'ravi.teja@vignan.edu', 'Computer Science', 'M.Tech Computer Science', 8, '+91-9876543206'),
('Mrs. Sunita Patel', 'sunita.patel@vignan.edu', 'Hindi', 'M.A. Hindi, B.Ed', 16, '+91-9876543207'),
('Mr. Karthik Narayan', 'karthik.n@vignan.edu', 'Social Studies', 'M.A. History, B.Ed', 11, '+91-9876543208'),
('Mrs. Deepa Krishnan', 'deepa.k@vignan.edu', 'Art & Craft', 'BFA, M.Ed', 9, '+91-9876543209'),
('Mr. Arun Prakash', 'arun.p@vignan.edu', 'Physical Education', 'M.P.Ed', 13, '+91-9876543210');

-- Students (sample data across classes)
INSERT INTO students (name, roll_number, class, section, date_of_birth, parent_name, phone, email, admission_year) VALUES
('Aarav Sharma', 'VGN-10A-001', '10', 'A', '2010-03-15', 'Mr. Rajesh Sharma', '+91-9800000001', 'aarav.s@vignan.edu', 2020),
('Diya Patel', 'VGN-10A-002', '10', 'A', '2010-07-22', 'Mr. Sunil Patel', '+91-9800000002', 'diya.p@vignan.edu', 2020),
('Arjun Reddy', 'VGN-10A-003', '10', 'A', '2010-01-10', 'Mr. Venkat Reddy', '+91-9800000003', 'arjun.r@vignan.edu', 2020),
('Saanvi Kumar', 'VGN-10B-001', '10', 'B', '2010-11-05', 'Mr. Anil Kumar', '+91-9800000004', 'saanvi.k@vignan.edu', 2020),
('Vihaan Rao', 'VGN-10B-002', '10', 'B', '2010-06-18', 'Mr. Krishna Rao', '+91-9800000005', 'vihaan.r@vignan.edu', 2019),
('Ananya Nair', 'VGN-9A-001', '9', 'A', '2011-04-25', 'Mr. Gopan Nair', '+91-9800000006', 'ananya.n@vignan.edu', 2020),
('Reyansh Gupta', 'VGN-9A-002', '9', 'A', '2011-09-12', 'Mr. Amit Gupta', '+91-9800000007', 'reyansh.g@vignan.edu', 2021),
('Ishita Verma', 'VGN-9B-001', '9', 'B', '2011-02-28', 'Mr. Rahul Verma', '+91-9800000008', 'ishita.v@vignan.edu', 2021),
('Aditya Joshi', 'VGN-8A-001', '8', 'A', '2012-08-14', 'Mr. Prakash Joshi', '+91-9800000009', 'aditya.j@vignan.edu', 2021),
('Kavya Iyer', 'VGN-8A-002', '8', 'A', '2012-12-03', 'Mr. Srinivas Iyer', '+91-9800000010', 'kavya.i@vignan.edu', 2021),
('Rohan Singh', 'VGN-8B-001', '8', 'B', '2012-05-20', 'Mr. Harpreet Singh', '+91-9800000011', 'rohan.s@vignan.edu', 2022),
('Myra Desai', 'VGN-7A-001', '7', 'A', '2013-10-08', 'Mr. Nikhil Desai', '+91-9800000012', 'myra.d@vignan.edu', 2022),
('Vivaan Choudhury', 'VGN-7A-002', '7', 'A', '2013-07-17', 'Mr. Amit Choudhury', '+91-9800000013', 'vivaan.c@vignan.edu', 2022),
('Riya Kapoor', 'VGN-7B-001', '7', 'B', '2013-01-30', 'Mr. Raj Kapoor', '+91-9800000014', 'riya.k@vignan.edu', 2022),
('Arnav Menon', 'VGN-6A-001', '6', 'A', '2014-06-11', 'Mr. Vishnu Menon', '+91-9800000015', 'arnav.m@vignan.edu', 2023),
('Siya Bhatt', 'VGN-6A-002', '6', 'A', '2014-03-22', 'Mr. Deepak Bhatt', '+91-9800000016', 'siya.b@vignan.edu', 2023),
('Dhruv Agarwal', 'VGN-6B-001', '6', 'B', '2014-09-05', 'Mr. Manoj Agarwal', '+91-9800000017', 'dhruv.a@vignan.edu', 2023),
('Anika Saxena', 'VGN-5A-001', '5', 'A', '2015-11-19', 'Mr. Rajat Saxena', '+91-9800000018', 'anika.s@vignan.edu', 2023),
('Kabir Malhotra', 'VGN-5A-002', '5', 'A', '2015-04-07', 'Mr. Vikram Malhotra', '+91-9800000019', 'kabir.m@vignan.edu', 2024),
('Zara Khan', 'VGN-5B-001', '5', 'B', '2015-08-25', 'Mr. Imran Khan', '+91-9800000020', 'zara.k@vignan.edu', 2024);

-- Courses
INSERT INTO courses (name, code, description, class, teacher_id, credits) VALUES
('Mathematics', 'MATH-10', 'Advanced Mathematics including Algebra, Geometry, and Trigonometry', '10', 1, 5),
('Physics', 'PHY-10', 'Fundamentals of Physics - Mechanics, Optics, and Electricity', '10', 2, 4),
('Chemistry', 'CHEM-10', 'Organic and Inorganic Chemistry fundamentals', '10', 3, 4),
('English', 'ENG-10', 'English Literature and Language', '10', 4, 4),
('Biology', 'BIO-10', 'Life Sciences - Cell Biology, Genetics, and Ecology', '10', 5, 4),
('Computer Science', 'CS-10', 'Introduction to Programming with Python', '10', 6, 3),
('Mathematics', 'MATH-9', 'Mathematics - Number Systems, Algebra, and Coordinate Geometry', '9', 1, 5),
('Physics', 'PHY-9', 'Motion, Force, and Work-Energy', '9', 2, 4),
('English', 'ENG-9', 'English Grammar and Composition', '9', 4, 4),
('Hindi', 'HIN-9', 'Hindi Sahitya and Vyakaran', '9', 7, 3),
('Social Studies', 'SS-8', 'History, Geography, and Civics', '8', 8, 4),
('Art & Craft', 'ART-7', 'Creative Arts - Drawing, Painting, and Sculpture', '7', 9, 2),
('Physical Education', 'PE-ALL', 'Sports, Fitness, and Yoga', 'All', 10, 2);

-- Announcements
INSERT INTO announcements (title, content, date, category, priority) VALUES
('Annual Day Celebration 2026', 'Vignan School Annual Day will be celebrated on April 15, 2026. All parents are cordially invited. Theme: "Wings of Innovation". Students participating in cultural programs should attend rehearsals from April 1.', '2026-03-20', 'Event', 'high'),
('Board Exam Results - Congratulations!', 'We are proud to announce that Vignan School achieved 98.5% pass rate in CBSE Board Exams 2025. 15 students scored above 95%. Congratulations to all students and teachers!', '2026-03-15', 'Academic', 'high'),
('Summer Camp Registration Open', 'Registration for Summer Camp 2026 is now open. Activities include Robotics, Coding, Swimming, Cricket, and Art Workshop. Register at the school office by March 30.', '2026-03-10', 'Activity', 'normal'),
('Parent-Teacher Meeting', 'PTM for classes 6-10 will be held on March 28, 2026 from 9 AM to 1 PM. Please carry the student progress report.', '2026-03-08', 'Meeting', 'high'),
('Inter-School Science Exhibition', 'Vignan School is hosting the Inter-School Science Exhibition on April 5, 2026. Students from classes 8-10 can submit their projects by March 25.', '2026-03-05', 'Competition', 'normal'),
('Library Week Celebration', 'National Library Week will be celebrated from March 24-28. Special activities include book fair, storytelling sessions, and reading marathon.', '2026-03-01', 'Event', 'normal'),
('Sports Day Announcement', 'Annual Sports Day will be held on April 20, 2026 at the school stadium. Practice sessions begin from April 1 during PT periods.', '2026-02-28', 'Sports', 'normal'),
('Fee Payment Reminder', 'Last date for Q4 fee payment is March 31, 2026. Late fee of Rs. 500 will be applicable after the due date. Online payment available through school portal.', '2026-02-25', 'Administrative', 'high');

-- Events
INSERT INTO events (title, description, event_date, location, category) VALUES
('Parent-Teacher Meeting', 'PTM for all classes - Discussion on student progress and upcoming plans', '2026-03-28', 'School Auditorium', 'Academic'),
('Inter-School Science Exhibition', 'Annual science exhibition with projects from 12 schools', '2026-04-05', 'School Exhibition Hall', 'Competition'),
('Annual Day Celebration', 'Cultural performances, awards ceremony, and chief guest address', '2026-04-15', 'School Auditorium', 'Cultural'),
('Sports Day', 'Track and field events, team sports, and prize distribution', '2026-04-20', 'School Stadium', 'Sports'),
('Summer Camp Begins', 'Robotics, Coding, Swimming, Cricket, and Art Workshop', '2026-05-01', 'School Campus', 'Activity'),
('Independence Day Celebration', 'Flag hoisting, patriotic songs, and cultural program', '2026-08-15', 'School Ground', 'Cultural'),
('Teachers Day', 'Special assembly and performances by students for teachers', '2026-09-05', 'School Auditorium', 'Cultural'),
('Dussehra Vacation Begins', 'School reopens on October 15, 2026', '2026-10-01', 'N/A', 'Holiday');

-- Achievements
INSERT INTO achievements (title, description, student_name, year, category) VALUES
('National Science Olympiad - Gold Medal', 'Secured 1st position in National Science Olympiad among 50,000 participants', 'Aarav Sharma', 2025, 'Academic'),
('CBSE National Athletics - Silver', 'Won silver medal in 100m sprint at CBSE National Athletics Meet', 'Arjun Reddy', 2025, 'Sports'),
('International Math Olympiad - Bronze', 'Represented India and won Bronze medal at International Math Olympiad', 'Diya Patel', 2025, 'Academic'),
('All India Painting Competition - Winner', 'First prize in CBSE National Art Competition', 'Kavya Iyer', 2025, 'Arts'),
('Coding Championship - State Topper', 'Topped Telangana state in HackerEarth Junior Coding Championship', 'Reyansh Gupta', 2024, 'Technology'),
('Debate Competition - Best Speaker', 'Best Speaker award at Inter-School Debate Championship 2024', 'Ananya Nair', 2024, 'Literary'),
('NTSE Scholarship Awardee', 'Selected for National Talent Search Examination scholarship', 'Saanvi Kumar', 2024, 'Academic'),
('District Cricket Champion', 'Led school cricket team to District Championship victory', 'Vihaan Rao', 2024, 'Sports'),
('98.5% Board Exam Pass Rate', 'School achieved 98.5% pass rate with 15 students scoring above 95%', 'School Achievement', 2025, 'Academic'),
('Green School Award', 'Recognized by Ministry of Environment for sustainable campus practices', 'School Achievement', 2025, 'Environment');
