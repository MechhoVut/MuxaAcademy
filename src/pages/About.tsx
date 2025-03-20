import React from 'react';
import { Award, BookOpen, Users, Target, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <BookOpen style={{ color: '#8d6e63' }} className="h-8 w-8" />,
      title: "Quality Education",
      description: "Delivering excellence in education through innovative teaching methods and comprehensive curriculum."
    },
    {
      icon: <Heart style={{ color: '#8d6e63' }} className="h-8 w-8" />,
      title: "Student-Centric",
      description: "Putting students first with personalized attention and support throughout their learning journey."
    },
    {
      icon: <Lightbulb style={{ color: '#8d6e63' }} className="h-8 w-8" />,
      title: "Innovation",
      description: "Embracing new technologies and teaching methods to provide cutting-edge education."
    }
  ];

  const team = [
    {
      name: "Rahul Saha",
      role: "Developer",
      image: "/student2.jpeg",
      description: "Expert on development."
    },
    {
      name: "Chandan Biswas",
      role: "Full Stack Developer",
      image: "/student1.jpeg",
      description: "Specializes in full-stack development."
    },
    {
      name: "Anirban Ghosh",
      role: "Engineer",
      image: "/student3.jpeg",
      description: "Leading innovative research initiatives in education"
    }
  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#000000', opacity: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">About Muxa Academy</h1>
              <p className="text-xl max-w-2xl">
                Empowering minds and shaping futures through excellence in education since 2010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div
              className="p-8 rounded-lg shadow-md"
              style={{ backgroundColor: '#d7ccc8' }}
            >
              <div className="flex items-center mb-4">
                <Target style={{ color: '#8d6e63' }} className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional educational experiences that inspire lifelong learning, foster critical thinking,
                and empower students to reach their full potential in an ever-evolving global landscape.
              </p>
            </div>
            <div
              className="p-8 rounded-lg shadow-md"
              style={{ backgroundColor: '#d7ccc8' }}
            >
              <div className="flex items-center mb-4">
                <Award style={{ color: '#8d6e63' }} className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be a leading institution that sets the standard for educational excellence, innovation, and student success, creating positive change in our communities and the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              The teacher guide everything we do at Muxa Academy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-lg shadow-md"
                style={{ backgroundColor: '#d7ccc8' }}
              >
                <div className="flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{value.title}</h3>
                <p className="text-gray-700 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Successful Students </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Dedicated professionals committed to educational excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md overflow-hidden"
                style={{ backgroundColor: '#d7ccc8' }}
              >
                <div className="w-full h-96"> {/* Added a div to control image height */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p style={{ color: '#8d6e63' }} className="font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-700">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-16" style={{ backgroundColor: '#8d6e63', color: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div style={{ color: '#d7ccc8' }}>Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div style={{ color: '#d7ccc8' }}>Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div style={{ color: '#d7ccc8' }}>Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div style={{ color: '#d7ccc8' }}>Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;