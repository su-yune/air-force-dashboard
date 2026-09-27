import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Status = 'Needs Action' | 'On Track' | 'At Risk';

interface ExecutiveSummary {
  nafAverageScore: number;
  nafOverallRating: string;
  bestPerformingTheatre: string;
  theatreNeedingAttention: string;
  threatsAboveTarget: number;
  threatsBelowTarget: number;
}

interface DimensionPerformance {
  dimension: string;
  nafAvg: number;
  best: string;
  bestTheatre: string;
  lowest: string;
  lowestTheatre: string;
  stdDev: number;
  status: Status;
}

interface TheatreSummary {
  theatre: string;
  region: string;
  score: number;
  rating: string;
  rank: number;
  trend: string;
  priorityArea: string;
  action: string;
  urgency: string;
}

interface TheatrePerformanceHistory {
  month: string;
  score: number;
  rating: string;
  trend: string;
}

interface DetailedTheatreInfo extends TheatreSummary {
  history: TheatrePerformanceHistory[];
  challenges: string[];
  recommendations: string[];
  analysis: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeMenu = 'Dashboard';
  searchTerm = '';
  selectedRegion = 'All Regions';
  selectedTheatre: TheatreSummary | null = null;
  showDetails = false;
  selectedDetailTheatre: DetailedTheatreInfo | null = null;
  showDetailedAnalysis = false;

  currentMonth = this.getCurrentMonth();
  previousMonth = this.getPreviousMonth();
  selectedTimeframe = 'current';

  readonly regions = [
    'All Regions',
    'NorthEast (Borno)',
    'North Central',
    'Southwest',
    'SouthCentral',
    'South',
    'SouthEast'
  ];

  readonly summary: ExecutiveSummary = {
    nafAverageScore: 0,
    nafOverallRating: 'UNSATISFACTORY',
    bestPerformingTheatre: 'OP HADIN KAI',
    theatreNeedingAttention: 'OP DELTA SAFE',
    threatsAboveTarget: 0,
    threatsBelowTarget: 7
  };

  readonly dimensions: DimensionPerformance[] = [
    {
      dimension: 'Operational Effectiveness',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    },
    {
      dimension: 'Joint Coordination',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    },
    {
      dimension: 'Resource Management',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    },
    {
      dimension: 'Personnel Development',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    },
    {
      dimension: 'Strategic Impact',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    },
    {
      dimension: 'Risk Assessment',
      nafAvg: 0,
      best: '0.0%',
      bestTheatre: 'OP HADIN KAI',
      lowest: '0.0%',
      lowestTheatre: 'OP HADIN KAI',
      stdDev: 0,
      status: 'Needs Action'
    }
  ];

  readonly theatres: TheatreSummary[] = [
    {
      theatre: 'OP HADIN KAI',
      region: 'NorthEast (Borno)',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 1,
      trend: '↑',
      priorityArea: 'Operational Effectiveness',
      action: 'Op Eff',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP WHIRL STROKE',
      region: 'North Central',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 2,
      trend: '→',
      priorityArea: 'Operational Effectiveness',
      action: 'Op Eff',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP FASAN YAMA SE',
      region: 'Southwest',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 3,
      trend: '↓',
      priorityArea: 'Resource Management',
      action: 'Resource',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP FASAN YAMA SE',
      region: 'SouthCentral',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 4,
      trend: '↓',
      priorityArea: 'Joint Coordination',
      action: 'Coordination',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP DELTA SAFE',
      region: 'South',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 5,
      trend: '↓',
      priorityArea: 'Strategic Impact',
      action: 'Strategy',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP SAVANNAH SHIELD',
      region: 'SouthEast',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 6,
      trend: '→',
      priorityArea: 'Risk Assessment',
      action: 'Risk',
      urgency: 'Urgent'
    },
    {
      theatre: 'OP UDOKA',
      region: 'SouthEast',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 7,
      trend: '↑',
      priorityArea: 'Personnel Development',
      action: 'Personnel',
      urgency: 'Urgent'
    }
  ];

  readonly theatreDetailMap: { [key: string]: DetailedTheatreInfo } = {
    'OP HADIN KAI': {
      theatre: 'OP HADIN KAI',
      region: 'NorthEast (Borno)',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 1,
      trend: '↑',
      priorityArea: 'Operational Effectiveness',
      action: 'Op Eff',
      urgency: 'Urgent',
      history: [
        { month: 'Aug 2026', score: 0, rating: 'UNSATISFACTORY', trend: '↓' },
        { month: 'Sep 2026', score: 0, rating: 'UNSATISFACTORY', trend: '→' },
        { month: 'Oct 2026', score: 0, rating: 'UNSATISFACTORY', trend: '↑' }
      ],
      challenges: [
        'Insufficient operational resources allocation',
        'Limited coordination with joint forces',
        'Personnel shortage affecting mission readiness',
        'Outdated equipment and systems',
        'Training gaps in modern warfare tactics'
      ],
      recommendations: [
        'Prioritize resource allocation to critical areas',
        'Establish inter-command coordination task force',
        'Implement comprehensive personnel training program',
        'Accelerate equipment upgrade initiatives',
        'Review and update operational procedures',
        'Strengthen intelligence gathering capabilities'
      ],
      analysis: 'OP HADIN KAI shows upward trend but remains below acceptable threshold. Recent improvements indicate positive response to interventions, but sustained effort needed across all dimensions.'
    },
    'OP DELTA SAFE': {
      theatre: 'OP DELTA SAFE',
      region: 'South',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 5,
      trend: '↓',
      priorityArea: 'Strategic Impact',
      action: 'Strategy',
      urgency: 'Urgent',
      history: [
        { month: 'Aug 2026', score: 0, rating: 'UNSATISFACTORY', trend: '↑' },
        { month: 'Sep 2026', score: 0, rating: 'UNSATISFACTORY', trend: '→' },
        { month: 'Oct 2026', score: 0, rating: 'UNSATISFACTORY', trend: '↓' }
      ],
      challenges: [
        'Declining strategic effectiveness over past months',
        'Resource misalignment with operational needs',
        'Communication breakdown between units',
        'Inadequate contingency planning',
        'Leadership transition impact on operations',
        'Environmental and logistical constraints'
      ],
      recommendations: [
        'Conduct comprehensive strategic review',
        'Realign resource deployment strategy',
        'Implement enhanced communication protocols',
        'Develop robust contingency plans',
        'Ensure leadership continuity and training',
        'Address logistical and environmental barriers',
        'Schedule quarterly performance reviews'
      ],
      analysis: 'OP DELTA SAFE requires immediate attention due to declining trend. The downward trajectory across multiple dimensions indicates systemic issues that need urgent intervention to prevent further deterioration.'
    },
    'OP WHIRL STROKE': {
      theatre: 'OP WHIRL STROKE',
      region: 'North Central',
      score: 0,
      rating: 'UNSATISFACTORY',
      rank: 2,
      trend: '→',
      priorityArea: 'Operational Effectiveness',
      action: 'Op Eff',
      urgency: 'Urgent',
      history: [
        { month: 'Aug 2026', score: 0, rating: 'UNSATISFACTORY', trend: '→' },
        { month: 'Sep 2026', score: 0, rating: 'UNSATISFACTORY', trend: '→' },
        { month: 'Oct 2026', score: 0, rating: 'UNSATISFACTORY', trend: '→' }
      ],
      challenges: [
        'Stagnant performance metrics',
        'Lack of innovation in operations',
        'Limited inter-theater coordination',
        'Personnel morale issues',
        'Funding constraints affecting modernization',
        'Geographic challenges affecting deployment'
      ],
      recommendations: [
        'Implement performance improvement program',
        'Foster innovation and best practice sharing',
        'Strengthen inter-theater partnerships',
        'Address personnel welfare and morale',
        'Seek additional funding opportunities',
        'Develop geographic-specific strategies'
      ],
      analysis: 'OP WHIRL STROKE performance is stable but stagnant. Without intervention, risk of further decline. Focus should be on breaking current plateau and implementing improvement initiatives.'
    }
  };

  getCurrentMonth(): string {
    const now = new Date();
    return now.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  getPreviousMonth(): string {
    const prev = new Date();
    prev.setMonth(prev.getMonth() - 1);
    return prev.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  get filteredTheatres(): TheatreSummary[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.theatres.filter(theatre => {
      const matchesSearch =
        !term ||
        theatre.theatre.toLowerCase().includes(term) ||
        theatre.region.toLowerCase().includes(term);

      const matchesRegion =
        this.selectedRegion === 'All Regions' ||
        theatre.region === this.selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }

  selectMenu(menu: string): void {
    this.activeMenu = menu;
  }

  openDetails(theatre: TheatreSummary): void {
    this.selectedTheatre = theatre;
    this.showDetails = true;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedTheatre = null;
  }

  openDetailedAnalysis(theatreName: string): void {
    const detailed = this.theatreDetailMap[theatreName];
    if (detailed) {
      this.selectedDetailTheatre = detailed;
      this.showDetailedAnalysis = true;
      this.showDetails = false;
    }
  }

  closeDetailedAnalysis(): void {
    this.showDetailedAnalysis = false;
    this.selectedDetailTheatre = null;
  }

  openBestPerformingTheatre(): void {
    this.openDetailedAnalysis(this.summary.bestPerformingTheatre);
  }

  openNeedingAttentionTheatre(): void {
    this.openDetailedAnalysis(this.summary.theatreNeedingAttention);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRegion = 'All Regions';
  }

  getStatusClass(status: Status): string {
    return status.toLowerCase().replaceAll(' ', '-');
  }

  getUrgencyClass(urgency: string): string {
    return urgency.toLowerCase().replaceAll(' ', '-');
  }
}
