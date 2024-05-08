import { OrganizationTypeDto } from './OrganizationTypeDto';

export interface OrganizationDto {
  id: number;
  name: string;
  type: OrganizationTypeDto;
}
