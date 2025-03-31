import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waitlistEmail || !/\S+@\S+\.\S+/.test(waitlistEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert email into Supabase
      const { error } = await supabase
        .from('waitlist') // Replace with your table name
        .insert([
          { 
            email: waitlistEmail,
            signed_up_at: new Date().toISOString()
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint error
          toast.error("This email is already on the waitlist!");
        } else {
          throw error;
        }
      } else {
        toast.success(`Thanks for joining the waitlist, ${waitlistEmail}!`);
        setWaitlistEmail("");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Transform your data into <span className="text-brand-500">perfect Powerpoint slides</span> in seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              SlideGenie automatically generates beautiful PowerPoint charts from your data, saving you hours of manual work.
            </p>
            <div className="mt-8 max-w-lg mx-auto">
              <p className="text-md text-muted-foreground mb-4">
                Join the waitlist to be updated:
              </p>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2 justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="shrink-0 w-full sm:w-auto px-8 rounded-md text-lg bg-brand-500 hover:bg-brand-600 text-white h-14"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow w-full sm:w-auto rounded-md text-lg h-14"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </form>
            </div>
          </div>
          
          {/* Video Embed Section */}
          <div className="relative rounded-xl overflow-hidden w-full shadow-2xl animate-fade-in aspect-video" style={{ animationDelay: '0.2s' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/01GcKKgB4Bc?autoplay=1&mute=1&modestbranding=1&rel=0"
              title="YouTube video player - SlideGenie Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          {/* End Video Embed Section */}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-brand-100 text-brand-800 rounded-full px-4 py-1.5 text-sm font-medium inline-block mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Everything you need for perfect charts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              SlideGenie combines powerful data handling with beautiful design to deliver presentation-ready charts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl border border-border relative overflow-hidden animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 z-0"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-500 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="bg-brand-100 text-brand-800 rounded-full px-4 py-1.5 text-sm font-medium inline-block mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              How SlideGenie works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create beautiful charts in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-brand-100">
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-4 h-4 bg-brand-500 rounded-full"></div>
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-500 mb-6">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-white border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-10 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Ready to create perfect charts?
                </h2>
                <p className="text-lg text-muted-foreground max-w-md">
                  Join thousands of professionals who save hours every week with SlideGenie.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chart-generator">
                  <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 rounded-md text-lg font-medium">
                    Start Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 rounded-md text-lg font-medium">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Features data
const features = [
  {
    title: "Smart Data Import",
    description: "Upload Excel, CSV, or connect to data sources. We'll handle the data processing for you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    )
  },
  {
    title: "Beautiful Chart Templates",
    description: "Choose from professionally designed chart templates that make your data shine.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18" />
        <path d="M18.4 9.4a2.4 2.4 0 1 1 4.8 0 2.4 2.4 0 1 1 -4.8 0" />
        <path d="M8.5 14.5a2 2 0 1 1 4 0 2 2 0 1 1 -4 0" />
        <path d="M14 14.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
        <path d="M8.5 8.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0" />
        <path d="M3 8.5h5.5" />
        <path d="M3 14.5h5.5" />
        <path d="M14.5 8.5h6.5" />
        <path d="M18.5 14.5h1.5" />
      </svg>
    )
  },
  {
    title: "PowerPoint Integration",
    description: "Automatically generate PowerPoint slides with your charts, ready for presentation.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    )
  },
];

// Steps data
const steps = [
  {
    title: "Upload Your Data",
    description: "Import your data from Excel, CSV, or connect to your data source."
  },
  {
    title: "Select Chart Type",
    description: "Choose the perfect visualization for your data from our library of chart types."
  },
  {
    title: "Export to PowerPoint",
    description: "Download your presentation-ready PowerPoint slides with beautiful charts."
  },
];

export default Index;
