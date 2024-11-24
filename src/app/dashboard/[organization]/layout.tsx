import loadAppData from '~/lib/server/loaders/load-app-data';
import AppRouteShell from '~/app/dashboard/[organization]/components/OrganizationScopeLayout';
import { withI18n } from '~/i18n/with-i18n';

async function AppLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  const data = await loadAppData(params.organization);

  return <AppRouteShell data={data}>{children}</AppRouteShell>;
}

export default withI18n(AppLayout);
