import { GlobalRole } from '../entities/GlobalRole';
import { GlobalRoleId } from '../value-objects/roles/GlobalRoleId';

export interface IGlobalRoleRepository {
  findById(id: GlobalRoleId): Promise<GlobalRole | null>;
  findByName(name: string): Promise<GlobalRole | null>;
  create(globalRole: GlobalRole): Promise<void>;
  update(globalRole: GlobalRole): Promise<void>;
  delete(id: GlobalRoleId): Promise<void>;
}
