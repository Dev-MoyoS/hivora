"use client";

import { motion } from "framer-motion";
import { MOCK_TALENT_OFFERS, MOCK_COLLABORATIONS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TalentWallPage() {
  return (
    <main className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Talent Wall</h1>
      <p className="text-sm text-muted-foreground">
        Offer or request skills · private chat only when both accept
      </p>

      <Tabs defaultValue="exchange" className="mt-6">
        <TabsList className="rounded-xl">
          <TabsTrigger value="exchange" className="rounded-lg">
            Skill exchange
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg">
            Collaborations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exchange" className="mt-4 grid gap-4 sm:grid-cols-2">
          {MOCK_TALENT_OFFERS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <Badge variant={t.type === "offer" ? "default" : "secondary"} className="rounded-lg capitalize">
                      {t.type}
                    </Badge>
                    <span className="text-sm font-medium">{t.pseudonym}</span>
                  </div>
                  <h3 className="mt-3 font-semibold">{t.skill}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{t.availability}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.badges.map((b) => (
                      <Badge key={b} variant="outline" className="rounded-lg text-xs">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <Button className="mt-4 w-full rounded-xl" variant="outline">
                    Request connection
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="projects" className="mt-4 space-y-4">
          {MOCK_COLLABORATIONS.map((c) => (
            <Card key={c.id} className="rounded-2xl">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                  <p className="mt-1 text-xs">Needs: {c.skillsNeeded.join(", ")}</p>
                  <p className="text-xs">Offers: {c.skillsOffered.join(", ")}</p>
                </div>
                <Button className="rounded-xl">Match</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </main>
  );
}
