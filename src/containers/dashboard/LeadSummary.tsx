import { ILeadSummary } from "@/interfaces";
import styles from './DashboardContainer.module.css';

interface LeadSummaryProps {
  leadSummary: ILeadSummary;
}

const LeadSummary = ({ leadSummary }: LeadSummaryProps) => {

    const {data,totalLeads,todayLeads,yesterdayLeads} = leadSummary;

    const qualified = data?.find(item => item._id === "Qualified")?.count || 0;
    const prospect = data?.find(item => item._id === "Prospects")?.count || 0;
    const followUp = data?.find(item => item._id === "Follow-up")?.count || 0;
    const enrolled = data?.find(item => item._id === "Enrolled")?.count || 0;
    const trialBooked = data?.find(item => item._id === "Trial Booked")?.count || 0;
    const disqualified = data?.find(item => item._id === "Disqualified")?.count || 0;

    const stats = [
    { title: "Total Leads", value: (totalLeads || 0), color: "#F2F7FD", textColor: "#212529" },
    { title: "Qualified", value: qualified, color: "#F0FDF4", textColor: "#15803D" },
    { title: "Follow up", value: followUp, color: "#FFFBEB", textColor: "#92400E" },
    { title: "Trial Booked", value: trialBooked, color: "#FEF2F2", textColor: "#B91C1C" },
    { title: "Enrolled", value: enrolled, color: "#FEF4FF", textColor: "#AB1CAF" },
    { title: "Disqualified", value: disqualified, color: "#FEF2F2", textColor: "#B91C1C" },
    
  ];

  return (
    <div>
      <div className={styles['lead-stats-container']}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={styles['lead-stats']}
            style={{ minWidth: "210px",backgroundColor: stat.color, color:stat.textColor }}
          >
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    
      <div className={styles['btn-group']}>
        <button className={`${styles.leadsBtn} ${styles.todayTotalLeadCount}`}>Today Leads <span>{todayLeads}</span></button>
        <button className={`${styles.leadsBtn} ${styles.yesterdayLeadCount}`}>Yesterday Leads <span>{yesterdayLeads}</span></button>
      </div>
    
    </div>
  )
}

export default LeadSummary;