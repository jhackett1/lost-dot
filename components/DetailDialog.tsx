import Modal from "react-modal"
import { ApplicationWithUser, UserWithApplications } from "../types"

const DetailDialog = ({
  data,
  open,
  handleClose,
}: {
  data: ApplicationWithUser | UserWithApplications
  open: boolean
  handleClose: () => void
}) => {
  Modal.setAppElement("#__next")

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Example dialog"
      className="dialog"
    >
      <button onClick={handleClose}>Close</button>
      <h1>Test content</h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Mauris augue neque
      gravida in. Pellentesque massa placerat duis ultricies lacus sed turpis
      tincidunt id. Odio morbi quis commodo odio aenean sed adipiscing diam
      donec. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Duis at
      tellus at urna condimentum. Eget egestas purus viverra accumsan in nisl
      nisi. Cras ornare arcu dui vivamus arcu felis bibendum ut. Auctor urna
      nunc id cursus metus aliquam. Imperdiet massa tincidunt nunc pulvinar
      sapien et ligula ullamcorper malesuada. Consequat interdum varius sit
      amet. Cursus sit amet dictum sit amet justo donec. Vel turpis nunc eget
      lorem dolor sed viverra ipsum. Mattis enim ut tellus elementum sagittis
      vitae et leo. Vivamus at augue eget arcu dictum. Arcu bibendum at varius
      vel pharetra vel turpis nunc. Est pellentesque elit ullamcorper dignissim
      cras tincidunt lobortis feugiat vivamus. Elementum nisi quis eleifend quam
      adipiscing vitae proin sagittis. Mauris rhoncus aenean vel elit
      scelerisque. Vitae purus faucibus ornare suspendisse. Cras pulvinar mattis
      nunc sed blandit libero volutpat. Velit sed ullamcorper morbi tincidunt
      ornare massa. Phasellus egestas tellus rutrum tellus pellentesque.
      Vestibulum lectus mauris ultrices eros. In pellentesque massa placerat
      duis ultricies. Adipiscing at in tellus integer feugiat scelerisque varius
      morbi enim. Neque egestas congue quisque egestas diam in arcu cursus
      euismod. Tortor at auctor urna nunc id. Praesent semper feugiat nibh sed
      pulvinar proin gravida hendrerit. Sollicitudin tempor id eu nisl nunc mi
      ipsum. Amet porttitor eget dolor morbi. Tempus urna et pharetra pharetra.
      Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit.
      Dictum fusce ut placerat orci nulla. Quam pellentesque nec nam aliquam sem
      et tortor. Cursus risus at ultrices mi tempus. Nisl purus in mollis nunc
      sed id. Dui accumsan sit amet nulla facilisi. Phasellus faucibus
      scelerisque eleifend donec pretium vulputate sapien nec sagittis. Ornare
      massa eget egestas purus viverra accumsan in. Feugiat in fermentum posuere
      urna nec tincidunt. Quis viverra nibh cras pulvinar mattis nunc sed. Enim
      nunc faucibus a pellentesque sit amet. Bibendum neque egestas congue
      quisque. Vehicula ipsum a arcu cursus. Hac habitasse platea dictumst
      vestibulum rhoncus est pellentesque elit ullamcorper. Interdum varius sit
      amet mattis vulputate enim nulla aliquet. Pharetra vel turpis nunc eget
      lorem dolor sed. Ornare lectus sit amet est. Aenean et tortor at risus
      viverra adipiscing at in tellus. Eu consequat ac felis donec. At auctor
      urna nunc id cursus metus. Neque aliquam vestibulum morbi blandit cursus
      risus. Pellentesque elit eget gravida cum sociis natoque penatibus et. Ut
      sem viverra aliquet eget sit amet tellus cras. Pellentesque nec nam
      aliquam sem. Velit ut tortor pretium viverra suspendisse potenti nullam.
      Volutpat blandit aliquam etiam erat velit. Euismod in pellentesque massa
      placerat. Venenatis tellus in metus vulputate eu scelerisque felis.
      Aliquet porttitor lacus luctus accumsan tortor posuere ac. Amet
      consectetur adipiscing elit pellentesque habitant. Ligula ullamcorper
      malesuada proin libero nunc consequat interdum. Aliquam purus sit amet
      luctus venenatis lectus magna fringilla. Purus faucibus ornare suspendisse
      sed nisi lacus sed viverra. Pulvinar pellentesque habitant morbi tristique
      senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula
      ipsum a arcu cursus vitae. Odio ut enim blandit volutpat maecenas volutpat
      blandit aliquam. Accumsan tortor posuere ac ut consequat semper viverra
      nam. Sapien pellentesque habitant morbi tristique senectus et. Mauris
      pharetra et ultrices neque ornare aenean. Cras tincidunt lobortis feugiat
      vivamus at augue. Integer enim neque volutpat ac tincidunt vitae semper
      quis lectus. A lacus vestibulum sed arcu. Eu feugiat pretium nibh ipsum
      consequat nisl vel pretium lectus. Nisl rhoncus mattis rhoncus urna neque.
      Sit amet risus nullam eget felis eget nunc lobortis mattis. Ornare
      suspendisse sed nisi lacus sed viverra. Nisl rhoncus mattis rhoncus urna
      neque viverra justo. Sit amet massa vitae tortor condimentum lacinia quis
      vel. Dui nunc mattis enim ut. Velit ut tortor pretium viverra suspendisse
      potenti nullam ac tortor. Quam lacus suspendisse faucibus interdum posuere
      lorem ipsum. Eget duis at tellus at urna condimentum. Odio facilisis
      mauris sit amet massa vitae. Adipiscing elit ut aliquam purus sit.
      Sagittis purus sit amet volutpat consequat. Gravida cum sociis natoque
      penatibus et magnis dis parturient. Eget felis eget nunc lobortis mattis.
      Tortor at risus viverra adipiscing at. Aliquam eleifend mi in nulla
      posuere sollicitudin aliquam. Amet mattis vulputate enim nulla aliquet.
      Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis.
      At risus viverra adipiscing at in. Eget duis at tellus at urna condimentum
      mattis pellentesque id. Feugiat nibh sed pulvinar proin gravida. Nulla
      facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.
      Tortor dignissim convallis aenean et. Sagittis eu volutpat odio facilisis
      mauris sit. Nisl purus in mollis nunc sed id semper. Nam aliquam sem et
      tortor consequat id porta nibh. Praesent tristique magna sit amet purus.
      Id diam maecenas ultricies mi eget mauris pharetra. Lorem ipsum dolor sit
      amet consectetur adipiscing. Nascetur ridiculus mus mauris vitae
      ultricies. At ultrices mi tempus imperdiet nulla malesuada. Sed blandit
      libero volutpat sed cras ornare arcu. Lectus mauris ultrices eros in. Sed
      viverra ipsum nunc aliquet. Aliquam id diam maecenas ultricies mi eget. Ut
      tellus elementum sagittis vitae et leo duis. Eget duis at tellus at urna
      condimentum mattis. Nisl purus in mollis nunc sed. In ornare quam viverra
      orci. Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis.
      Facilisi etiam dignissim diam quis. Viverra tellus in hac habitasse platea
      dictumst vestibulum. Mauris ultrices eros in cursus turpis massa
      tincidunt. Sem viverra aliquet eget sit amet tellus cras. Est pellentesque
      elit ullamcorper dignissim cras tincidunt. Egestas erat imperdiet sed
      euismod nisi porta lorem. Amet aliquam id diam maecenas. Varius duis at
      consectetur lorem donec massa sapien. Massa placerat duis ultricies lacus
      sed. Rhoncus dolor purus non enim. Amet aliquam id diam maecenas
      ultricies. Et leo duis ut diam quam nulla porttitor massa id. Diam
      sollicitudin tempor id eu nisl nunc. Curabitur vitae nunc sed velit
      dignissim sodales ut eu sem. Euismod quis viverra nibh cras pulvinar.
      Ullamcorper a lacus vestibulum sed arcu non. Arcu odio ut sem nulla
      pharetra diam sit. Lectus quam id leo in. Tellus at urna condimentum
      mattis pellentesque. Imperdiet nulla malesuada pellentesque elit eget
      gravida. Pellentesque habitant morbi tristique senectus et netus. Purus in
      mollis nunc sed id semper risus in. Sit amet consectetur adipiscing elit.
      Vel pretium lectus quam id leo in vitae turpis. Commodo viverra maecenas
      accumsan lacus vel facilisis volutpat. Pulvinar etiam non quam lacus
      suspendisse faucibus interdum posuere. Amet cursus sit amet dictum. Eget
      nunc lobortis mattis aliquam faucibus purus in massa. Ac tortor dignissim
      convallis aenean. Vel orci porta non pulvinar neque laoreet suspendisse
      interdum. Proin libero nunc consequat interdum varius sit amet mattis
      vulputate. Vel pharetra vel turpis nunc eget. Pellentesque massa placerat
      duis ultricies. Accumsan tortor posuere ac ut consequat semper. Potenti
      nullam ac tortor vitae purus faucibus ornare suspendisse. Nunc mattis enim
      ut tellus elementum sagittis vitae. Volutpat blandit aliquam etiam erat
      velit scelerisque in. Tellus in metus vulputate eu scelerisque felis
      imperdiet. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. Sed
      cras ornare arcu dui vivamus arcu felis. Mi tempus imperdiet nulla
      malesuada pellentesque elit eget. Eros in cursus turpis massa. Quis
      eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Velit
      euismod in pellentesque massa placerat duis ultricies. Lorem dolor sed
      viverra ipsum nunc aliquet bibendum enim facilisis. Gravida quis blandit
      turpis cursus. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.
      Ornare quam viverra orci sagittis eu volutpat odio facilisis. Suscipit
      adipiscing bibendum est ultricies integer quis auctor elit sed. Sagittis
      id consectetur purus ut faucibus. Ultricies leo integer malesuada nunc vel
      risus commodo. Et magnis dis parturient montes nascetur ridiculus mus
      mauris vitae. Amet massa vitae tortor condimentum lacinia quis vel eros
      donec. Eu lobortis elementum nibh tellus molestie nunc non blandit. Massa
      tempor nec feugiat nisl pretium. Turpis egestas integer eget aliquet nibh
      praesent tristique. Pulvinar elementum integer enim neque volutpat ac
      tincidunt. Mattis rhoncus urna neque viverra justo nec. Consectetur
      adipiscing elit ut aliquam purus sit amet. Leo a diam sollicitudin tempor
      id eu. Consectetur purus ut faucibus pulvinar elementum integer. Duis ut
      diam quam nulla porttitor. Non sodales neque sodales ut etiam sit amet
      nisl. Massa enim nec dui nunc mattis enim ut tellus. Lacus sed viverra
      tellus in hac habitasse platea. Id ornare arcu odio ut sem. Vel quam
      elementum pulvinar etiam non quam lacus suspendisse. Id leo in vitae
      turpis massa sed elementum tempus egestas. Tincidunt vitae semper quis
      lectus nulla at. Mattis rhoncus urna neque viverra justo nec ultrices dui.
      Amet purus gravida quis blandit turpis cursus in hac habitasse. Est lorem
      ipsum dolor sit amet. Pharetra magna ac placerat vestibulum lectus mauris
      ultrices. Magna fringilla urna porttitor rhoncus dolor purus non enim.
      Lectus urna duis convallis convallis tellus id interdum velit laoreet.
      Accumsan tortor posuere ac ut consequat semper. Malesuada bibendum arcu
      vitae elementum curabitur vitae nunc sed. Sed euismod nisi porta lorem
      mollis aliquam ut porttitor. Vulputate sapien nec sagittis aliquam
      malesuada bibendum arcu. Cursus mattis molestie a iaculis at. Lectus proin
      nibh nisl condimentum id venenatis a condimentum. Justo donec enim diam
      vulputate ut. Eget nulla facilisi etiam dignissim diam quis enim lobortis
      scelerisque. Vel facilisis volutpat est velit egestas. Tellus rutrum
      tellus pellentesque eu tincidunt tortor aliquam. Et malesuada fames ac
      turpis. Amet cursus sit amet dictum sit amet. Amet mattis vulputate enim
      nulla aliquet porttitor lacus luctus. Facilisi nullam vehicula ipsum a
      arcu cursus. Blandit cursus risus at ultrices mi tempus imperdiet nulla
      malesuada. A diam maecenas sed enim. Amet nisl purus in mollis. Malesuada
      pellentesque elit eget gravida cum sociis natoque. Velit sed ullamcorper
      morbi tincidunt ornare massa eget egestas purus. Tristique senectus et
      netus et malesuada. Egestas fringilla phasellus faucibus scelerisque
      eleifend. Eget sit amet tellus cras adipiscing enim eu turpis egestas.
      Habitant morbi tristique senectus et netus et malesuada fames ac. Sit amet
      nisl purus in mollis nunc. Vulputate ut pharetra sit amet aliquam id.
      Gravida rutrum quisque non tellus orci ac auctor augue mauris. Massa
      sapien faucibus et molestie ac feugiat sed lectus vestibulum. Sagittis id
      consectetur purus ut. Commodo quis imperdiet massa tincidunt nunc
      pulvinar. Iaculis at erat pellentesque adipiscing commodo. Libero nunc
      consequat interdum varius sit amet mattis. Euismod lacinia at quis risus
      sed vulputate odio. Sapien faucibus et molestie ac feugiat sed lectus
      vestibulum mattis. Sed libero enim sed faucibus turpis in eu mi bibendum.
      Risus sed vulputate odio ut enim blandit volutpat maecenas. Ipsum dolor
      sit amet consectetur. Quis risus sed vulputate odio ut enim blandit
      volutpat. Odio eu feugiat pretium nibh ipsum. Libero id faucibus nisl
      tincidunt eget nullam. Felis donec et odio pellentesque diam. Aliquam
      faucibus purus in massa tempor nec feugiat nisl pretium. Arcu felis
      bibendum ut tristique et egestas. Consectetur adipiscing elit ut aliquam
      purus sit amet luctus venenatis. Massa placerat duis ultricies lacus sed
      turpis. Pellentesque habitant morbi tristique senectus. Cursus vitae
      congue mauris rhoncus aenean vel elit scelerisque mauris. Nec ullamcorper
      sit amet risus nullam eget. Egestas fringilla phasellus faucibus
      scelerisque eleifend donec pretium vulputate. Purus sit amet luctus
      venenatis lectus magna fringilla urna porttitor. Risus quis varius quam
      quisque id. Amet nisl suscipit adipiscing bibendum est ultricies integer.
      Orci nulla pellentesque dignissim enim sit amet venenatis urna. Egestas
      diam in arcu cursus euismod. Ullamcorper sit amet risus nullam eget felis
      eget nunc lobortis. In ante metus dictum at tempor commodo ullamcorper a.
      Consequat interdum varius sit amet mattis vulputate enim nulla. Bibendum
      est ultricies integer quis auctor elit sed vulputate mi. Dictum at tempor
      commodo ullamcorper a. Sagittis eu volutpat odio facilisis mauris sit amet
      massa. Vulputate mi sit amet mauris commodo quis imperdiet massa
      tincidunt. Egestas maecenas pharetra convallis posuere morbi leo urna.
      Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed.
      Dignissim convallis aenean et tortor at risus. Lacus vel facilisis
      volutpat est velit egestas. Eget dolor morbi non arcu risus quis varius.
      Id donec ultrices tincidunt arcu non sodales neque sodales ut. Ut faucibus
      pulvinar elementum integer enim. Platea dictumst vestibulum rhoncus est.
      Quis blandit turpis cursus in hac. Elementum facilisis leo vel fringilla
      est ullamcorper eget nulla. Iaculis eu non diam phasellus. Tellus orci ac
      auctor augue mauris. Commodo viverra maecenas accumsan lacus vel.
      Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam.
      Eget nunc scelerisque viverra mauris in. At erat pellentesque adipiscing
      commodo elit at. Orci porta non pulvinar neque laoreet suspendisse
      interdum consectetur. Sit amet consectetur adipiscing elit ut. Non tellus
      orci ac auctor. Volutpat consequat mauris nunc congue nisi vitae suscipit.
      Eu ultrices vitae auctor eu augue ut. Mus mauris vitae ultricies leo
      integer. Diam volutpat commodo sed egestas egestas fringilla phasellus.
      Risus commodo viverra maecenas accumsan lacus vel. Magna fermentum iaculis
      eu non diam phasellus. Etiam non quam lacus suspendisse faucibus. Euismod
      quis viverra nibh cras pulvinar mattis nunc sed. Scelerisque eu ultrices
      vitae auctor eu. Dis parturient montes nascetur ridiculus. Venenatis
      tellus in metus vulputate eu scelerisque felis imperdiet. Semper eget duis
      at tellus at urna condimentum. Vulputate enim nulla aliquet porttitor
      lacus luctus accumsan tortor. Rhoncus aenean vel elit scelerisque mauris
      pellentesque pulvinar pellentesque. Mattis enim ut tellus elementum
      sagittis vitae. Nisi lacus sed viverra tellus in hac habitasse platea.
      Nunc non blandit massa enim nec dui nunc mattis. Hendrerit dolor magna
      eget est. Euismod elementum nisi quis eleifend quam adipiscing vitae
      proin. Nisi porta lorem mollis aliquam ut porttitor leo a. Cursus sit amet
      dictum sit amet justo donec enim. Pellentesque habitant morbi tristique
      senectus et netus. Convallis posuere morbi leo urna molestie. Ridiculus
      mus mauris vitae ultricies leo integer malesuada nunc vel. Maecenas sed
      enim ut sem viverra aliquet. Massa sed elementum tempus egestas sed. Vitae
      et leo duis ut diam quam nulla porttitor. Sed lectus vestibulum mattis
      ullamcorper velit. Pretium vulputate sapien nec sagittis aliquam malesuada
      bibendum arcu vitae.
    </Modal>
  )
}

export default DetailDialog
