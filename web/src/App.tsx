import { useEffect, useState } from 'react';

import { Select } from './components/Select';
import { Switch } from './components/Switch';
import { Button } from './components/Button';
import { Popover } from './components/Popover';
import { TextArea } from './components/TextArea';

import { 
  Copy,
  Trash, 
  ArrowClockwise, 
  ArrowsClockwise, 
} from 'phosphor-react';

import clsx from 'clsx';

import { api } from './axios';

export function App() {
  const [lan, setLan] = useState(localStorage.lan);
  const [wireless, setWireless] = useState(localStorage.wireless);

  const [unformattedDevices, setUnformattedDevices] = useState('');
  const [template, setTemplate] = useState('');
  const [lastDevices, setLastDevices] = useState('');

  const [toggle, setToggle] = useState(false);
  const [resetLanWireless, setResetLanWireless] = useState(false);
  const [resetDevices, setResetDevices] = useState(false);
  const [copied, setCopied] = useState(false);

  const [darkMode, setDarkMode] = useState(localStorage.theme === 'dark');

  function handlePopover() {
    navigator.clipboard.writeText(unformattedDevices);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  function handleResetLanWireless() {
    setResetLanWireless(true);

    setTimeout(() => {
      setLan('${connection} ${lan} ${name} (${mac}) ${ip}, ');
      setWireless('${connection} ${name} (${mac}) ${ip} ${dbm} dBm, ');
      setResetLanWireless(false);
    }, 1000);
  }

  function handleResetDevices() {
    if (!lastDevices) return;

    setResetDevices(true);

    setTimeout(() => {
      setUnformattedDevices(lastDevices);
      setResetDevices(false);
    }, 1000);
  }

  async function handleDevices() {
    if (!unformattedDevices) return;

    setToggle(true);
    setLastDevices(unformattedDevices);

    await api
      .post('/', {
        unformattedDevices: unformattedDevices.trim(),
        lanTemplate: lan,
        wirelessTemplate: wireless,
      })
    .then(async (response) => {
      await response.data;
      setUnformattedDevices(response.data.formattedDevices);
    })

    .catch((error) => console.error(error))

    .finally(() => setToggle(false));
  }

  useEffect(() => {
    if (darkMode) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }

    if (!localStorage.lan) {
      const lanTemplate = '${connection} ${lan} ${name} (${mac}) ${ip}, ';

      localStorage.lan = lanTemplate;
      setLan(lanTemplate);
    } else {
      localStorage.lan = lan;
    }

    if (!localStorage.wireless) {
      const wirelessTemplate = '${connection} ${name} (${mac}) ${ip} ${dbm} dBm, ';

      localStorage.wireless = wirelessTemplate;
      setWireless(wirelessTemplate);
    } else {
      localStorage.wireless = wireless;
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark'); 
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, lan, wireless]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <div className="w-full max-w-2xl flex flex-col gap-8 h-72">
        <div className="flex justify-between">
          <h1 className="font-bold text-3xl text-secondary dark:text-primary">
            Connected Devices
            <Switch checked={darkMode} setChecked={setDarkMode} />
          </h1>
          <Button onClick={handleDevices}> 
            Formatar <ArrowsClockwise className={`${toggle ? 'animate-spin' : ''}`} size={20} />
          </Button>
        </div>
        <div className="flex gap-8 h-64 relative">
          <div className="flex flex-col w-1/2 gap-4">
            <Select setValue={setTemplate} options={['lan', 'wireless']} />
            <TextArea
              onChange={template === 'lan' ? (e) => {
                setLan(e.target.value);
                localStorage.lan = '${connection} ${lan} ${name} (${mac}) ${ip}, ';
              } : (e) => {
                setWireless(e.target.value);
                localStorage.wireless = '${connection} ${name} (${mac}) ${ip} ${dbm} dBm, ';
              }}
              value={template === 'lan' ? lan : wireless}
            />
            <ArrowClockwise
              weight={darkMode ? 'bold' : 'regular'}
              onClick={handleResetLanWireless}
              className={clsx(
                'text-secondary dark:text-primary cursor-pointer absolute -bottom-6',
                { ['animate-spin']: resetLanWireless }
              )}
            /> 
          </div>
          <div className="w-1/2">
            <TextArea
              placeholder={'Cole os dispositivos conectados aqui ou apenas o MAC...'}
              onChange={(e) => setUnformattedDevices(e.target.value)}
              value={unformattedDevices}
            />
            <div className="absolute -bottom-6 right-0 flex items-center gap-2">
              <Trash
                weight={darkMode ? 'bold' : 'regular'}
                onClick={() => setUnformattedDevices('')}
                className="text-secondary dark:text-primary cursor-pointer"
              />
              <Popover open={copied} setOpen={setCopied}>
                <Copy
                  weight={darkMode ? 'bold' : 'regular'}
                  onClick={handlePopover}
                  className="text-secondary dark:text-primary cursor-pointer"
                />
              </Popover>
              <ArrowClockwise
                weight={darkMode ? 'bold' : 'regular'}
                onClick={handleResetDevices}
                className={clsx(
                'text-secondary dark:text-primary cursor-pointer',
                { ['animate-spin']: resetDevices }
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
