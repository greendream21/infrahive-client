// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardList, IconChartInfographic } from '@tabler/icons';
import { Image, TextSnippet, KeyboardVoice, Psychology } from '@mui/icons-material';
// constant
const icons = {
  IconClipboardList,
  IconChartInfographic,
  TextSnippet,
  Image,
  KeyboardVoice,
  Psychology
};

// ==============================|| WIDGET MENU ITEMS ||============================== //

const GenerativeAI = {
  id: 'generative_ai',
  title: <FormattedMessage id="generative ai" />,
  type: 'group',
  children: [
    {
      id: 'infrabuilder',
      title: <FormattedMessage id="infrabuilder" />,
      type: 'item',
      url: '/dashboard/infrabuilder',
      icon: icons.Psychology
    },
    {
      id: 'image',
      title: <FormattedMessage id="image" />,
      type: 'item',
      url: '/dashboard/images',
      icon: icons.Image
    },
    {
      id: 'text',
      title: <FormattedMessage id="Text" />,
      type: 'item',
      url: '/dashboard/texts',
      icon: icons.TextSnippet
    },
    {
      id: 'voice',
      title: <FormattedMessage id="voice" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.KeyboardVoice
    }
  ]
};

export default GenerativeAI;
