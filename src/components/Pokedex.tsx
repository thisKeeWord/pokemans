import React, {
  FunctionComponent, ReactElement, useEffect, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Pokedex: FunctionComponent = () => {
  const [genList, setGenList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [openDrawer, setOpenDrawer] = useState(false)
  const [generation, setGeneration] = useState<number | string>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | number>('')
  const history = useHistory();
  const location = useLocation();
  const { pathname, state } = location;
  const path = pathname.split('/')[1];

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open)
  }

  // switch between generation list and generation's pokemon list
  const list = (): ReactElement => {
    const arr = generation ? genList[generation as number - 1] : genList;
    const clickListener = (gen: number | string) => {
      if (!generation) {
        return setGeneration(gen as number + 1);
      }
      history.push(`/${gen}`, { updated: true });
      setSelectedPokemon(gen)
    };

    return (
      <div role="presentation" onKeyDown={() => toggleDrawer(false)}>
        <List>
          {arr?.map((el, index: number) => (
            <ListItem button key={index} onClick={() => clickListener(generation ? el.name : index)}>
              <ListItemText primary={generation ? el.name : `Gen ${index + 1}`} />
              {!generation && <ChevronRightIcon />}
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      error && setError('')

      try {
        const gensData = await axios.get('https://pokeapi.co/api/v2/generation/?limit=1500')
        // eslint-disable-next-line no-restricted-syntax
        const fetchResults = await Promise.all(gensData.data.results.map(async (data, index: number) => {
          try {
            const resultData = await axios.get(data.url)
            const sortedData = resultData.data.pokemon_species.sort(
              (a, b) => a.url.replace(/\D/g, '').slice(1) - b.url.replace(/\D/g, '').slice(1),
            );

            return sortedData
          } catch (err) {
            throw new Error(`An error occurred fetching the details of gen ${index + 1}`)
          }
        }))

        setGenList(fetchResults)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (path && !state) {
      setSelectedPokemon(path)
    }
  }, [path]);

  if (loading) {
    return <div className="spinner" />
  }

  return (
    <div className="pokeList">
      {error && <span>{error}</span>}
      <Button onClick={() => toggleDrawer(true)}>View By Generation</Button>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        {generation > 0 && (
        <ListItem button onClick={() => setGeneration(0)}>
          <ListItemText primary="Back to main menu" />
          <ChevronLeftIcon />
        </ListItem>
        )}
        {list()}
      </Drawer>
      {selectedPokemon}
    </div>
  );
};

export default Pokedex;
