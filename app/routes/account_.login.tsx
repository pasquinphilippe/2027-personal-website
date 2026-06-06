import {redirect} from 'react-router';
import type {Route} from './+types/account_.login';

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || '';
  const language = url.searchParams.get('lang') || '';
  const params = new URLSearchParams();

  if (language === 'fr' || locale.toLowerCase().startsWith('fr')) {
    params.set('lang', 'fr');
  }

  const query = params.toString();
  return redirect(`/client-login${query ? `?${query}` : ''}`);
}
