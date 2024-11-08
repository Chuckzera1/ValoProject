export type AgentData = {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[];
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData?: RecruitmentData;
  abilities: Ability[];
};

export type Role = {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
};

export type RecruitmentData = {
  counterId: string;
  milestoneId: string;
  milestoneThreshold: number;
  useLevelVpCostOverride: boolean;
  levelVpCostOverride: number;
  startDate: Date;
  endDate: Date;
};

export type Ability = {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
  voiceLine?: VoiceLine;
};

export type VoiceLine = {
  minDuration: number;
  maxDuration: number;
  mediaList: Media[];
};

export type Media = {
  id: number;
  wwise: string;
  wave: string;
};
