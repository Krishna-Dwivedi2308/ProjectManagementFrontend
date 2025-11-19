import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Users,
  ClipboardList,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 bg-gray-950 text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Manage Projects. Empower Teams.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            From organizations to tasks—everything you need to boost
            productivity and streamline collaboration, all in one place.
          </p>
          <Button
            size="lg"
            className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/auth")}
          >
            Get Started Free
          </Button>
        </div>

        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl absolute -top-20 -left-20" />
          <div className="w-96 h-96 bg-purple-500 rounded-full blur-3xl absolute bottom-0 right-0" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Building2 className="mx-auto w-12 h-12 text-blue-400 mb-4" />,
            title: "Organizations",
            desc: "Create and manage multiple organizations seamlessly.",
          },
          {
            icon: (
              <ClipboardList className="mx-auto w-12 h-12 text-green-400 mb-4" />
            ),
            title: "Projects & Tasks",
            desc: "Organize projects into tasks and subtasks for clarity.",
          },
          {
            icon: <Users className="mx-auto w-12 h-12 text-purple-400 mb-4" />,
            title: "Members & Roles",
            desc: "Add members, assign roles, and collaborate efficiently.",
          },
          {
            icon: (
              <CheckCircle className="mx-auto w-12 h-12 text-orange-400 mb-4" />
            ),
            title: "Productivity",
            desc: "Streamline teamwork and finish projects faster.",
          },
        ].map((f, i) => (
          <Card
            key={i}
            className="shadow-lg rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-blue-600 transition-colors duration-300"
          >
            <CardContent className="p-8 text-center">
              {f.icon}
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-10 text-gray-300">
            {[
              { step: "1", title: "Create Organization", desc: "Set up your org space." },
              { step: "2", title: "Add Projects", desc: "Break down work into tasks." },
              { step: "3", title: "Invite Members", desc: "Assign roles & collaborate." },
              { step: "4", title: "Track Progress", desc: "Stay on top with real-time updates." },
            ].map((s, i) => (
              <div key={i} className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-600 transition">
                <div className="text-3xl font-bold text-blue-400 mb-4">{s.step}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-gray-950 py-20 text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Ready to <span className="text-blue-400">get started?</span>
        </h2>
        <Button
          size="lg"
          className="px-10 py-6 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/auth")}
        >
          Sign Up Now
        </Button>
      </footer>
    </div>
  );
};

export default LandingPage;
