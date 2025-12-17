'use client'
import { TrendingUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/Dashboard/Shared/Badge";

const statsData = [
  {
    title: "Active Users",
    value: "1,284",
    change: "8.5%",
    changeText: "Up from last month",
    icon: "/stroke-icon-set-5.svg",
    iconBg:
      "bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(30,30,30,1)_100%)]",
  },
  {
    title: "Total Claims",
    value: "2,489",
    change: "8.5%",
    changeText: "Up from last month",
    icon: "/frame-61430-1.svg",
    iconBg: "",
  },
  {
    title: "Total AI Calls",
    value: "1,367",
    change: "8.5%",
    changeText: "Up from last month",
    icon: "/frame-61431.svg",
    iconBg: "",
  },
  {
    title: "Documents Status",
    value: "1,234",
    change: "8.5%",
    changeText: "Up from last month",
    icon: "/frame-61430.svg",
    iconBg: "",
  },
];

const pendingClaimsData = [
  {
    badge: "New Claim",
    title: "Sarah Johnson - Vehicle Damage",
    time: "5 min ago",
  },
  {
    badge: "Claim Update",
    title: "John Smith - Claim #482",
    time: "15 min ago",
  },
  {
    badge: "User Verification",
    title: "Mike Chen - Documents",
    time: "1 hour ago",
  },
  {
    badge: "Priority Claim",
    title: "Emergency Claim #892",
    time: "2 hours ago",
  },
];

const recentActivityData = [
  {
    avatar: "/images/avatar.png",
    name: "John Doe",
    action: "Submitted new claim",
    time: "2 min ago",
  },
  {
    avatar: "/images/avatar.png",
    name: "Sarah Smith",
    action: "Completed claim processing",
    time: "25 min ago",
  },
  {
    avatar: "/images/avatar.png",
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
  {
    avatar: "/images/avatar.png",
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
  {
    avatar: "/images/avatar.png",
    name: "Mike Johnson",
    action: "Updated claim status",
    time: "2 hours ago",
  },
];

const chartLegendData = [
  { label: "New Cases", color: "" },
  { label: "All Calls", color: "" },
];

const pieChartLegendData = [
  { label: "Completed 55%", color: "" },
  { label: "In Progress 30%", color: "" },
  { label: "Pending 9%", color: "" },
  { label: "Rejected 6%", color: "" },
];

export const ActivityOverviewSection = () => {
  return (
    <section className="flex flex-col items-start gap-6 w-full relative mt-[30px]">
      <div className="flex w-full items-center gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="flex-1 bg-[#ffffff05] rounded-[20px] shadow-[6px_6px_40px_#00000014] border-0"
          >
            <CardContent className="flex items-start gap-3.5 p-5">
              <div className="flex flex-col items-start gap-3 flex-1">
                <div className="[font-family:'Inter',Helvetica] font-normal text-blackblack-100 text-base tracking-[0] leading-[22.4px]">
                  {stat.title}
                </div>

                <div className="[font-family:'Inter',Helvetica] font-bold text-[#ffffff] text-[28px] tracking-[0] leading-[33.6px]">
                  {stat.value}
                </div>

                <div className="inline-flex items-center gap-2.5">
                  <TrendingUpIcon className="w-5 h-5 text-[#00b69b]" />

                  <div className="[font-family:'Inter',Helvetica] font-normal text-base tracking-[0] leading-[normal] whitespace-nowrap">
                    <span className="font-medium text-[#00b69b]">
                      {stat.change}
                    </span>
                    <span className="font-medium text-[#b5b5b5]">
                      {" "}
                      {stat.changeText}
                    </span>
                  </div>
                </div>
              </div>

              {stat.iconBg ? (
                <div
                  className={`flex w-[60px] h-[60px] items-center justify-center p-[15px] rounded-[18px] ${stat.iconBg}`}
                >
                  <img
                    className="w-[30px] h-[30px]"
                    alt="Icon"
                    src={stat.icon}
                  />
                </div>
              ) : (
                <img className="w-[60px] h-[60px]" alt="Icon" src={stat.icon} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-start gap-6 w-full">
        <Card className="flex-1 bg-[#ffffff05] rounded-[20px] shadow-[6px_6px_40px_#00000014] border-0">
          <CardContent className="flex flex-col items-start gap-8 p-6">
            <div className="flex flex-col items-start gap-3">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#ffffff] text-2xl tracking-[0] leading-[28.8px]">
                Weekly Activity Trend
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base tracking-[0] leading-[19.2px]">
                AI calls and new cases over the past week
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="relative w-full h-[283px]">
                <img
                  className="absolute w-[95.14%] h-[91.16%] top-0 left-[3.71%]"
                  alt="Chart background"
                  src="/group.png"
                />

                <div className="absolute w-[97.80%] h-[7.41%] top-[92.59%] left-[2.12%]">
                  <img
                    className="absolute w-[97.29%] h-0 top-0 left-0 object-cover"
                    alt="X axis"
                    src="/vector-10.svg"
                  />

                  <div className="absolute w-full h-full top-0 left-0">
                    <div className="absolute w-[3.85%] h-full top-0 left-0">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[42.18%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[92.59%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Mon
                      </div>
                    </div>

                    <div className="absolute w-[3.28%] h-full top-0 left-[16.37%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[44.66%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[91.30%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Tue
                      </div>
                    </div>

                    <div className="absolute w-[3.91%] h-full top-0 left-[32.25%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[46.02%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[92.72%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Wed
                      </div>
                    </div>

                    <div className="absolute w-[3.42%] h-full top-0 left-[48.62%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[48.13%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[91.67%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Thu
                      </div>
                    </div>

                    <div className="absolute w-[2.38%] h-full top-0 left-[65.54%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[39.71%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[88.03%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Fri
                      </div>
                    </div>

                    <div className="absolute w-[2.99%] h-full top-0 left-[81.45%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[41.58%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[90.48%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Sat
                      </div>
                    </div>

                    <div className="absolute w-[3.42%] h-full top-0 left-[96.87%]">
                      <img
                        className="absolute w-0 h-[30.74%] top-0 left-[59.74%]"
                        alt="Tick"
                        src="/vector-1.svg"
                      />

                      <div className="absolute w-[91.67%] h-[76.84%] top-[23.16%] left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-center tracking-[0] leading-[normal]">
                        Sun
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute w-[3.78%] h-[95.34%] top-0 left-0">
                  <img
                    className="absolute w-0 h-[95.62%] top-0 left-[98.16%]"
                    alt="Y axis"
                    src="/vector-17.svg"
                  />

                  <div className="absolute w-[100.00%] h-full top-0 left-0">
                    <div className="absolute w-[40.34%] h-[5.98%] top-[94.02%] left-[67.03%]">
                      <img
                        className="absolute w-[30.65%] h-0 top-[51.60%] left-[51.08%] object-cover"
                        alt="Tick"
                        src="/vector.svg"
                      />

                      <div className="w-[40.86%] absolute h-full top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-right tracking-[0] leading-[normal]">
                        0
                      </div>
                    </div>

                    <div className="absolute w-[80.05%] h-[5.98%] top-[70.12%] left-[27.32%]">
                      <img
                        className="absolute w-[15.44%] h-0 top-[51.60%] left-[75.35%] object-cover"
                        alt="Tick"
                        src="/vector.svg"
                      />

                      <div className="w-[67.70%] absolute h-full top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-right tracking-[0] leading-[normal]">
                        55
                      </div>
                    </div>

                    <div className="absolute w-[99.20%] h-[5.98%] top-[46.22%] left-[8.17%]">
                      <img
                        className="absolute w-[12.46%] h-0 top-[51.60%] left-[80.11%] object-cover"
                        alt="Tick"
                        src="/vector.svg"
                      />

                      <div className="w-[70.59%] absolute h-full top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-right tracking-[0] leading-[normal]">
                        110
                      </div>
                    </div>

                    <div className="absolute w-[103.25%] h-[5.98%] top-[22.31%] left-[4.12%]">
                      <img
                        className="absolute w-[11.97%] h-0 top-[51.60%] left-[80.89%] object-cover"
                        alt="Tick"
                        src="/vector.svg"
                      />

                      <div className="w-[73.48%] absolute h-full top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-right tracking-[0] leading-[normal]">
                        165
                      </div>
                    </div>

                    <div className="absolute w-[107.37%] h-[5.98%] top-0 left-0">
                      <img
                        className="absolute w-[11.51%] h-0 top-[24.93%] left-[81.62%] object-cover"
                        alt="Tick"
                        src="/vector.svg"
                      />

                      <div className="w-[77.39%] absolute h-full top-0 left-0 [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs text-right tracking-[0] leading-[normal]">
                        220
                      </div>
                    </div>
                  </div>
                </div>

                <img
                  className="absolute w-[95.84%] h-[52.80%] top-[6.26%] left-[3.20%]"
                  alt="Chart line 1"
                  src="/group-1.png"
                />

                <img
                  className="absolute w-[95.84%] h-[32.29%] top-[38.17%] left-[3.20%]"
                  alt="Chart line 2"
                  src="/group-2.png"
                />
              </div>

              <div className="inline-flex items-center gap-[13px]">
                {chartLegendData.map((legend, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-[1.36px]"
                  >
                    <img
                      className="w-[21.82px] h-[21.82px]"
                      alt="Dot"
                      src="/dot.svg"
                    />
                    <div className="[font-family:'Inter',Helvetica] font-medium text-base leading-[19.2px] text-[#ffffff] tracking-[0] whitespace-nowrap">
                      {legend.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-[#ffffff05] rounded-[20px] shadow-[6px_6px_40px_#00000014] border-0">
          <CardContent className="flex flex-col items-start gap-8 p-6">
            <div className="flex flex-col items-start gap-3">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#ffffff] text-2xl tracking-[0] leading-[28.8px]">
                Claims Trend - This Week
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base tracking-[0] leading-[19.2px]">
                Daily claim submissions and completions
              </p>
            </div>

            <div className="flex h-[295px] items-center justify-center gap-[90px] w-full">
              <div className="relative w-[250px] h-[250px]">
                <div className="w-[61.40%] h-[99.61%] top-0 left-[38.60%] bg-[url(/vector-6.svg)] absolute bg-[100%_100%]" />

                <div className="w-[42.34%] h-[59.63%] top-[37.96%] left-0 bg-[url(/vector-12.svg)] absolute bg-[100%_100%]" />

                <div className="w-[33.59%] h-[33.69%] top-[7.73%] left-[2.41%] bg-[url(/vector-13.svg)] absolute bg-[100%_100%]" />

                <div className="w-[22.72%] h-[26.74%] top-0 left-[27.00%] bg-[url(/vector-5.svg)] absolute bg-[100%_100%]" />
              </div>

              <div className="inline-flex flex-col items-start gap-[9.09px]">
                {pieChartLegendData.map((legend, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-[1.36px]"
                  >
                    <img
                      className="w-[21.82px] h-[21.82px]"
                      alt="Dot"
                      src="/dot.svg"
                    />
                    <div className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff] text-base tracking-[0] leading-[19.2px] whitespace-nowrap">
                      {legend.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-start gap-6 w-full">
        <Card className="flex-1 bg-[#ffffff05] rounded-[20px] shadow-[6px_6px_40px_#00000014] border-0">
          <CardContent className="flex flex-col items-start gap-10 p-6">
            <div className="flex flex-col items-start gap-3">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-2xl leading-[28.8px] text-[#ffffff] tracking-[0] whitespace-nowrap">
                Pending Claims
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base tracking-[0] leading-[19.2px] whitespace-nowrap">
                Claims requiring your attention
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              {pendingClaimsData.map((claim, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 w-full bg-[#0a0e14] rounded-[10px]"
                >
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <Badge className="h-[22px] px-2 py-0.5 rounded-lg border border-solid border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(30,30,30,1)_100%)] [font-family:'Arial-Regular',Helvetica] font-normal text-xs leading-4 text-[#ffffff]">
                      {claim.badge}
                    </Badge>

                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xl tracking-[0] leading-[24.0px] whitespace-nowrap">
                      {claim.title}
                    </div>

                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs tracking-[0] leading-[14.4px] whitespace-nowrap">
                      {claim.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-[#ffffff05] rounded-[20px] shadow-[6px_6px_40px_#00000014] border-0">
          <CardContent className="flex flex-col items-start gap-10 p-6">
            <div className="flex flex-col items-start gap-3">
              <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#ffffff] text-2xl tracking-[0] leading-[28.8px] whitespace-nowrap">
                Recent Activity
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base tracking-[0] leading-[19.2px] whitespace-nowrap">
                Latest actions across the platform
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full">
              {recentActivityData.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 w-full bg-[#0a0e14] rounded-[10px]"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-8 h-8">
                      <Image src={activity.avatar} alt={activity.name} width={32} height={32} />
                    </div>

                    <div className="inline-flex flex-col items-start gap-[7px]">
                      <div className="flex items-center gap-3">
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xl tracking-[0] leading-[24.0px] whitespace-nowrap">
                          {activity.name}
                        </div>

                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xl tracking-[0] leading-[24.0px] whitespace-nowrap">
                          {activity.action}
                        </div>
                      </div>

                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xs tracking-[0] leading-[14.4px]">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
