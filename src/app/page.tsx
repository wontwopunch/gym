import { ScrollReveal } from "@/components/ScrollReveal";
import { Header } from "@/components/sections/Header";
import { EquipmentLineupSection } from "@/components/sections/EquipmentLineupSection";
import { ProfessionalTrainersSection } from "@/components/sections/ProfessionalTrainersSection";
import { RealTransformationSection } from "@/components/sections/RealTransformationSection";
import { ConsultationCtaSection } from "@/components/sections/ConsultationCtaSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { TrainingContactSection } from "@/components/sections/TrainingContactSection";
import { Hero } from "@/components/sections/Hero";
import { SpaceTrainingSection } from "@/components/sections/SpaceTrainingSection";
import { StanceRecordSection } from "@/components/sections/StanceRecordSection";
import { TapeBannerSection } from "@/components/sections/TapeBannerSection";
import { WhyStanceSection } from "@/components/sections/WhyStanceSection";
import { WhyStance24hSection } from "@/components/sections/WhyStance24hSection";
import { WhyStanceFocusSpaceSection } from "@/components/sections/WhyStanceFocusSpaceSection";
import { WhyStanceGoalSpaceSection } from "@/components/sections/WhyStanceGoalSpaceSection";
import { WhyStanceShowerSection } from "@/components/sections/WhyStanceShowerSection";
import { WhyStanceTrainerSection } from "@/components/sections/WhyStanceTrainerSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-[#09080e]">
        <Hero />
        <ScrollReveal>
          <SpaceTrainingSection />
        </ScrollReveal>
        <ScrollReveal>
          <EquipmentLineupSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStanceSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStanceTrainerSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStanceShowerSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStance24hSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStanceFocusSpaceSection />
        </ScrollReveal>
        <ScrollReveal>
          <WhyStanceGoalSpaceSection />
        </ScrollReveal>
        <ScrollReveal>
          <StanceRecordSection />
        </ScrollReveal>
        <ScrollReveal>
          <TapeBannerSection />
        </ScrollReveal>
        <ScrollReveal>
          <ProfessionalTrainersSection />
        </ScrollReveal>
        <ScrollReveal>
          <RealTransformationSection />
        </ScrollReveal>
        <ScrollReveal>
          <TrainingContactSection />
        </ScrollReveal>
        <ScrollReveal>
          <ConsultationCtaSection />
        </ScrollReveal>
      </main>
      <ScrollReveal>
        <SiteFooter />
      </ScrollReveal>
    </>
  );
}
