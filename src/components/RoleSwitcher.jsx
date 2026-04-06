import { useFinance } from '../context/FinanceContext';
import { USER_ROLES } from '../utils/constants';

function RoleSwitcher() {
  const { role, setRole } = useFinance();

  return (
    <div className="role-switcher">
      <label htmlFor="role-select">Role</label>
      <select
        id="role-select"
        className="role-select"
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        <option value={USER_ROLES.admin}>Admin</option>
        <option value={USER_ROLES.viewer}>Viewer</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;
