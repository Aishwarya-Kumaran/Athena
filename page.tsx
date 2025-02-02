'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Star, Trophy, Sparkles,
  Briefcase, GraduationCap, Heart,
  ArrowRight, Book
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WomenMentorshipApp = () => {
  // Story related states
  const [activeStory, setActiveStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Search related state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Matching form related states
  const [matchingForm, setMatchingForm] = useState({
    location: '',
    interest: '',
    experience: '',
    mentorshipType: ''
  });

  // Match result related states
  type MatchResult = {
    name: string;
    role: string;
    company: string;
    expertise: string[];
    initials: string;
    location: string;
    yearsExp: number;
    matchReason: string;
  };
  
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);

  // Avatar backgrounds for variety
  const avatarColors = [
    'from-rose-400 to-orange-300',
    'from-blue-400 to-emerald-400',
    'from-purple-500 to-pink-500',
    'from-amber-400 to-orange-500',
    'from-teal-400 to-cyan-400',
    'from-fuchsia-500 to-pink-500'
  ];

  const getGradientClass = (index: number) => {
    return avatarColors[index % avatarColors.length];
  };

  // Success stories data
  const successStories = [
    {
      name: "Sarah Chen",
      role: "Tech Lead at Google",
      story: "From bootcamp graduate to Tech Lead in 3 years. My mentor helped me navigate the tech industry and build confidence.",
      image: "/api/placeholder/800/400",
      achievement: "Led a team of 15 engineers"
    },
    {
      name: "Dr. Maya Patel",
      role: "AI Research Scientist",
      story: "Transitioned from academia to industry. Found invaluable guidance through the mentorship program.",
      image: "/api/placeholder/800/400",
      achievement: "Published 5 research papers"
    },
    {
      name: "Jessica Wong",
      role: "Startup Founder", 
      story: "Started my AI consulting firm with guidance from my mentor. Now helping other women enter tech.",
      image: "/api/placeholder/800/400",
      achievement: "Raised $2M in funding"
    }
  ];

  const memberProfiles = [
    {
      name: "Emily Rodriguez",
      role: "Frontend Development",
      company: "Microsoft",
      expertise: ["Frontend Development", "React", "UI/UX", "Full Stack Development"],
      image: "/api/placeholder/400/400",
      initials: "ER",
      yearsExp: 8,
      available: true,
      menteeCount: 12,
      location: "Remote",
      workMode: "Remote",
      mentorshipStyle: ["Technical Skills", "Career Guidance","Leadership Development"],
      languages: ["English", "Spanish"]
    },
    {
      name: "Nithya Nilakandhan",
      role: "AI",
      company: "Qualcomm",
      expertise: ["AI", "React", "Data Science", "ML"],
      image: "/api/placeholder/400/400",
      initials: "ER",
      yearsExp: 1,
      available: true,
      menteeCount: 12,
      location: "Remote",
      workMode: "Remote",
      mentorshipStyle: ["Technical Skills", "Career Guidance", "Leadership Development"],
      languages: ["English", "Spanish"]
    },
    {
      name: "Priya Shah",
      role: "Product Manager", 
      company: "Salesforce",
      expertise: ["Product Management", "Agile", "UX", "Data Analytics"],
      image: "/api/placeholder/400/400",
      initials: "PS",
      yearsExp: 6,
      available: true,
      menteeCount: 8,
      location: "San Francisco, CA",
      workMode: "Hybrid",
      mentorshipStyle: ["Leadership Development", "Career Guidance"],
      languages: ["English", "Hindi"]
    },
    {
      name: "Sarah Johnson",
      role: "Data Scientist",
      company: "Amazon",
      expertise: ["Data Science", "Machine Learning", "Python", "AI/ML"],
      image: "/api/placeholder/400/400",
      initials: "SJ",
      yearsExp: 5,
      available: true,
      menteeCount: 6,
      location: "New York, NY",
      workMode: "Local",
      mentorshipStyle: ["Technical Skills", "Project Guidance"],
      languages: ["English"]
    },
    {
      name: "Maria Garcia",
      role: "Backend Developer",
      company: "Netflix",
      expertise: ["Backend Development", "Java", "System Design", "Full Stack Development"],
      image: "/api/placeholder/400/400",
      initials: "MG",
      yearsExp: 4,
      available: true,
      menteeCount: 5,
      location: "Los Angeles, CA",
      workMode: "Hybrid",
      mentorshipStyle: ["Technical Skills", "Code Reviews"],
      languages: ["English", "Spanish"]
    },
    {
      name: "Dr. Lisa Chen",
      role: "AI Research Engineer",
      company: "Google",
      expertise: ["AI/ML", "Deep Learning", "Python", "Research"],
      image: "/api/placeholder/400/400",
      initials: "LC",
      yearsExp: 10,
      available: true,
      menteeCount: 4,
      location: "Remote",
      workMode: "Remote",
      mentorshipStyle: ["Research Guidance", "Technical Skills"],
      languages: ["English", "Mandarin"]
    }
];
  // Autoplay effect for stories
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setActiveStory((prev) => (prev + 1) % successStories.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, successStories.length]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMatchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMatching(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: matchingForm,
          availableMentors: memberProfiles
        })
      });
      const data = await response.json();
      
      // Find a matching mentor from your memberProfiles array
      const selectedMentor = memberProfiles.find(mentor => 
        // Match based on interest and expertise
        mentor.expertise.some(skill => 
          skill.toLowerCase().includes(matchingForm.interest.toLowerCase())
        )
      ) || memberProfiles[0]; // Default to first mentor if no match found

      // Use the existing data structure to set match result
      const matchResult = {
        name: selectedMentor.name,           // e.g., "Sarah Johnson"
        role: selectedMentor.role,           // e.g., "Data Scientist"
        company: selectedMentor.company,      // e.g., "Amazon"
        expertise: selectedMentor.expertise,  // e.g., ["Machine Learning", "Python"...]
        initials: selectedMentor.initials,   // e.g., "SJ"
        location: selectedMentor.location,    // e.g., "New York, NY"
        yearsExp: selectedMentor.yearsExp,   // e.g., 5
        matchReason: `${selectedMentor.name} is a ${selectedMentor.role} at ${selectedMentor.company} with ${selectedMentor.yearsExp} years of experience. Their expertise in ${selectedMentor.expertise.join(', ')} aligns perfectly with your interests.`
      };

      setMatchResult(matchResult);

    } catch (error) {
      console.error('Matching error:', error);
    }
    setIsMatching(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-200 to-cyan-200 p-8 animate-gradient-x">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 text-center">
          Athena - Women Empowering Women
        </h1>
        <p className="text-purple-600 text-center mb-12 text-lg">
          Connect, grow, and succeed together through mentorship
        </p>

        {/* Navigation */}
<div className="flex flex-wrap gap-4 mb-12 justify-center sticky top-4 z-50 p-4 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg mx-4">

          {[
            { id: 'stories', title: 'Success Stories' },
            { id: 'members', title: 'Browse Members' },
            { id: 'matching', title: 'Smart Matching' },
            { id: 'community', title: 'Community Events' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm text-purple-600 
              hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white 
              transition-all duration-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-purple-300 
              active:scale-95"
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-24">
          {/* Success Stories Section */}
          <section id="stories" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Success Stories</h2>
            <p className="text-purple-600 text-center mb-8 text-lg">
              Be inspired by women who've transformed their careers through mentorship
            </p>
            <div className="relative overflow-hidden rounded-2xl">
              {successStories.map((story, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${
                    idx === activeStory ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${getGradientClass(idx)} p-8 md:p-12 rounded-2xl`}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-1 text-white">
                        <h3 className="text-3xl font-bold mb-2">{story.name}</h3>
                        <p className="text-xl mb-4 opacity-90">{story.role}</p>
                        <p className="text-lg mb-6 italic">"{story.story}"</p>
                        <div className="flex items-center gap-3">
                          <Trophy className="w-6 h-6" />
                          <span className="text-lg">{story.achievement}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30">
                          <div className={`w-full h-full bg-gradient-to-br ${getGradientClass(idx)} flex items-center justify-center`}>
                            <span className="text-6xl font-bold text-white/90">
                              {story.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-white text-purple-600 p-3 rounded-full shadow-lg">
                          <Star className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {successStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStory(idx)}
                    className={`transition-all ${
                      idx === activeStory 
                        ? 'w-8 bg-white' 
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    } h-2 rounded-full`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Browse Members Section */}
          <section id="members" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Browse Members</h2>
            <p className="text-purple-600 text-center mb-8 text-lg">
              Connect with amazing women in tech and expand your network
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, role, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-500"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberProfiles
  .filter(member => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase().trim();
    return (
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.company.toLowerCase().includes(query) ||
      member.expertise.some(exp => 
        exp.toLowerCase().includes(query)
      ) ||
      member.location.toLowerCase().includes(query)
    );
  })
                .map((member, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`h-32 bg-gradient-to-r ${getGradientClass(idx)} rounded-t-xl flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-white/90">{member.initials}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-purple-900">{member.name}</h3>
                    <p className="text-purple-600">{member.role}</p>
                    <p className="text-sm text-purple-500 mb-4">{member.company}</p>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Smart Matching Section */}
          <section id="matching" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Smart Matching</h2>
            <p className="text-purple-600 text-center mb-8 text-lg">
              Our AI matches you with mentors based on your goals and interests
            </p>

            {/* Matching Form */}
            <div className="max-w-2xl mx-auto mb-16 bg-white/90 rounded-xl p-8 shadow-lg">
              <form className="space-y-6" onSubmit={handleMatchSubmit}>
                <div>
                  <label className="block text-purple-900 font-medium mb-2">Location Preference</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500  text-gray-900 "
                    value={matchingForm.location}
                    onChange={(e) => setMatchingForm({...matchingForm, location: e.target.value})}
                  >
                    <option value="">Select location...</option>
                    <option value="remote">Remote Only</option>
                    <option value="local">Local Only</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-900 font-medium mb-2">Area of Interest</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                    value={matchingForm.interest}
                    onChange={(e) => setMatchingForm({...matchingForm, interest: e.target.value})}
                  >
                    <option value="">Select interest...</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="data">Data Science</option>
                    <option value="ai">AI/ML</option>
                    <option value="product">Product Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-900 font-medium mb-2">Experience Level</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                    value={matchingForm.experience}
                    onChange={(e) => setMatchingForm({...matchingForm, experience: e.target.value})}
                  >
                    <option value="">Select experience level...</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-900 font-medium mb-2">Mentorship Type</label>
                  <select 
                    className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                    value={matchingForm.mentorshipType}
                    onChange={(e) => setMatchingForm({...matchingForm, mentorshipType: e.target.value})}
                  >
                    <option value="">Select mentorship type...</option>
                    <option value="career">Career Guidance</option>
                    <option value="technical">Technical Skills</option>
                    <option value="leadership">Leadership Development</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg 
                    hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
                  disabled={isMatching}
                >
                  {isMatching ? 'Finding your perfect match...' : 'Find My Mentor Match'}
                </button>
              </form>
              {matchResult && (
  <div className="mt-8 bg-white/90 rounded-xl p-8 shadow-lg">
    <h3 className="text-2xl font-bold text-purple-900 mb-4">Your Best Match</h3>
    <div className="flex items-start gap-6">
      <div className={`h-24 w-24 bg-gradient-to-r ${getGradientClass(0)} rounded-full flex items-center justify-center`}>
        <span className="text-3xl font-bold text-white">{matchResult.initials}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-purple-900">{matchResult.name}</h4>
        <p className="text-purple-600">{matchResult.role}</p>
        <p className="text-sm text-purple-500 mb-4">{matchResult.company}</p>
        <div className="mb-4">
          <h5 className="font-medium text-purple-800 mb-2">Why this is a great match:</h5>
          <p className="text-purple-600">{matchResult.matchReason}</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg 
          hover:from-purple-600 hover:to-pink-600 transition-all">
          Connect Now
        </button>
      </div>
    </div>
  </div>
)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Briefcase className="w-8 h-8" />, label: "Industry Experience", progress: 75 },
                { icon: <GraduationCap className="w-8 h-8" />, label: "Learning Style", progress: 85 },
                { icon: <Heart className="w-8 h-8" />, label: "Personal Values", progress: 90 }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-center">
                    <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${getGradientClass(idx)} text-white mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">{item.label}</h3>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getGradientClass(idx)}`}
                        style={{width: `${item.progress}%`}}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Community Events Section */}
          <section id="community" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">Community Events</h2>
            <p className="text-purple-600 text-center mb-8 text-lg">
              Join virtual and in-person events to connect with other women in tech
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Monthly Networking", icon: <Users className="w-6 h-6" /> },
                { name: "Tech Talks", icon: <Book className="w-6 h-6" /> },
                { name: "Career Workshops", icon: <Briefcase className="w-6 h-6" /> },
                { name: "Coding Sessions", icon: <GraduationCap className="w-6 h-6" /> }
              ].map((event, idx) => (
                <div key={idx} 
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${getGradientClass(idx)} text-white group-hover:scale-110 transition-transform`}>
                        {event.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-purple-900">{event.name}</h3>
                    </div>
                    <button className="text-purple-600 group-hover:translate-x-2 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Users />, label: "Active Members", value: "5,000+" },
            { icon: <Star />, label: "Successful Matches", value: "1,200+" },
            { icon: <Trophy />, label: "Career Transitions", value: "800+" },
            { icon: <Sparkles />, label: "Events Hosted", value: "250+" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-purple-500 mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-purple-900 mb-1">{stat.value}</div>
              <div className="text-purple-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <WomenMentorshipApp />
    </main>
  );
}