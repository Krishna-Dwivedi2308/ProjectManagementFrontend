const AvailableUserRoles = import.meta.env.VITE_USER_ROLES.split(',');
const AvailableTaskStatuses = import.meta.env.VITE_TASK_STATUS.split(',');
// console.log(AvailableUserRoles);

export { AvailableUserRoles, AvailableTaskStatuses };
