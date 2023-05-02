import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useDisclosure
} from '@chakra-ui/react'
const NoteAccordition = ({ note }) => {

        return(
          <Accordion  borderColor="gray.500" bg="gray.300"  allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  {note.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {note.description}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        )
    }

    export default NoteAccordition
