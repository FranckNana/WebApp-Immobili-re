package com.immo.immobilier.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.hibernate.engine.spi.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.immo.immobilier.Dao.MailDao;
import com.immo.immobilier.Dao.PublicationDao;
import com.immo.immobilier.Dao.UsersDao;
import com.immo.immobilier.exceptions.PublicationIntrouvableException;
import com.immo.immobilier.exceptions.UserIntrouvableException;
import com.immo.immobilier.model.Email;
import com.immo.immobilier.model.Publication;
import com.immo.immobilier.model.SmtpMailSender;
import com.immo.immobilier.model.Users;

@RestController
public class UsersController {

	@Autowired
	private UsersDao userDao;
	
	@Autowired
	private PublicationDao publicationDao;
	
	@Autowired
	private MailDao mailDao;
	
	@Autowired
	private SmtpMailSender smtpMailSender;

	
	/*************************************************************************************/
	/*  			  ENREGISTREMENT D'UN UTILISATEUR CLIENT/PROMOTEUR					 */
	/**
	 * @throws MessagingException ***********************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value= "/newusers") 
	public ResponseEntity<Void> addUser(@RequestBody Users user) throws MessagingException {
		
		Users newUser =  userDao.save(user);
		
		if (newUser == null) {
			return ResponseEntity.noContent().build();
		}
		else {
			sendMailFromServerToUser(newUser,0);
			return ResponseEntity.status(201).build();
		}
		
	}
	
	/*************************************************************************************/
	/*  			  RECUPERATION D'UN UTILISATEUR CLIENT/PROMOTEUR					 */
	/*************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value = "connexion/{email}")
	public Users getUser(@PathVariable String email) throws UserIntrouvableException {
		
		Users u =  userDao.findByEmail(email);

		if(u == null) 
			throw new UserIntrouvableException("L'utilisateur avec l'e-mail "+email+" n'existe pas");
		return u;
	}
	
	
	/*************************************************************************************/
	/*  			  ENREGISTREMENT D'UNE PUBLICATION D'OFFRE				        	 */
	/*************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value= "/newpublication") 
	public ResponseEntity<Void> addPublication(@RequestBody Publication pub) {

		Users u = userDao.findByEmail(pub.getEmail());
		pub.setUser(u);
		Publication newPublication =  publicationDao.save(pub);

		if (newPublication == null) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.status(201).build();
		}
		
	}
	
	
	/*************************************************************************************/
	/*  			   RECUPERATION DE PUB D'UN USER A TRAVERS SON MAIL			         */
	/*************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value= "publications/{email}") 
	public List<Publication> getPubFromEmail(@PathVariable String email) throws PublicationIntrouvableException{
		List<Publication> pub = publicationDao.getPub(email);
		
		if(pub == null) 
			throw new PublicationIntrouvableException("Publications introuvables pour cet utilisateur");
		return pub;
	}
	
	
	/*************************************************************************************/
	/*  			             SUPPRESSION D'UNE PUBLICATION SON ID     				 */
	/*************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping(value= "delete/{id}") 
	public ResponseEntity<Void> deletePub(@PathVariable int id) {
		publicationDao.deleteById(id);
		
		return ResponseEntity.status(200).build();
	}
	
	
	/*************************************************************************************/
	/*  			               SUPPRESSION D'UN USER ET SES PUB		    			 */
	/*************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping(value= "deleteuser/{email}")
	public ResponseEntity<Void> deleteUserByMail(@PathVariable String email) throws PublicationIntrouvableException {

		List<Publication> pubFromEmail = getPubFromEmail(email);
		for(int i=0;i<pubFromEmail.size();i++) {
			publicationDao.deleteById(pubFromEmail.get(i).getId());
		}
		
		List<Email> emails = getEmails(email);
		for(int i=0;i<emails.size();i++) {
			mailDao.deleteById(emails.get(i).getId());
		}
		
		Users u = userDao.findByEmail(email);
		userDao.delete(u);
		
		return ResponseEntity.status(200).build();
	}
	
	/************************************************************************************/
	/*  			   RECUPERATION DE TOUTES LES PUBLICATIONS          		        */
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value= "publications") 
	public List<Publication> getAllPub() throws PublicationIntrouvableException{
		List<Publication> pub = publicationDao.findAll();
		
		if(pub == null) 
			throw new PublicationIntrouvableException("Aucune publications enregistrée");
		return pub;
	}
	
	
	
	/************************************************************************************/
	/*  			   	RECUPERATION D' UNE PUBLICATION AVEC L'ID        		        */
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value= "publication/{id}")
	public Publication getPubById(@PathVariable int id) throws PublicationIntrouvableException{
		Publication pub = publicationDao.findById(id);
		
		if(pub == null) 
			throw new PublicationIntrouvableException("Aucune publications enregistrée");
		return pub;
	}	
	
	
	/************************************************************************************/
	/*  			   		   MODIFICATION D'UNE PUBLICATION       		        	*/
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping(value= "/modification-pub") 
	public ResponseEntity<Void> ModifPub(@RequestBody Publication pub) {
		
		Publication p = pub;
		Publication newPublication = publicationDao.save(p);
		/*Publication p = publicationDao.findById(pub.getId());
		p.setAdresse(pub.getAdresse());
		p.setFonction(pub.getFonction());
		p.setPhoto(pub.getPhoto());
		p.setPrix(pub.getPrix());
		p.setSuperficie(pub.getSuperficie());
		p.setType(pub.getType());
		
		Users u = userDao.findByEmail(pub.getUser().getEmail());
		p.setUser(u);
		publicationDao.save(p);*/

		if (newPublication == null) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.status(200).build();
		}
		
		
	}
	
	
	/************************************************************************************/
	/*  			   		   MODIFICATION D'UN UTILISATEUR	      		        	*/
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping(value= "/modification-user") 
	public ResponseEntity<Void> ModifUser(@RequestBody Users user) throws MessagingException {
		
		Users userFindByEmail = userDao.findByEmail(user.getEmail());
		userFindByEmail.setAccountType(user.getAccountType());
		userFindByEmail.setAddress(user.getAddress());
		userFindByEmail.setCity(user.getCity());
		userFindByEmail.setCodePostal(user.getCodePostal());
		userFindByEmail.setName(user.getName());
		userFindByEmail.setSurname(user.getSurname());
		userFindByEmail.setPhoneNumber(user.getPhoneNumber());
		
		Users newUser = userDao.save(userFindByEmail);
		
		if (newUser == null) {
			return ResponseEntity.noContent().build();
		}
		else {
			sendMailFromServerToUser(newUser,1);
			return ResponseEntity.status(200).build();
		}
		
	}
	
	
	/************************************************************************************/
	/*  			   			ENREGISTREMENT DU MAIL EN BASE         		         	*/
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(value = "/send-mail")
	public ResponseEntity<Void> recordMail(@RequestBody Email email) throws MessagingException{
		
		Users u = userDao.findByEmail(email.getEmailDst());
		email.setUser(u);
		Email mailToSend = mailDao.save(email);
		
		if (mailToSend == null) {
			return ResponseEntity.noContent().build();
		}
		else {
			sendMail(mailToSend);
			return ResponseEntity.status(201).build();
		}
	}
	

	/************************************************************************************/
	/*  			   			  	RECUPERATION DES EMAILS          		         	*/
	/************************************************************************************/
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value= "mesmail/{email}") 
	public List<Email> getEmails(@PathVariable String email) throws PublicationIntrouvableException{
		List<Email> email2 = mailDao.getEmail(email);
		
		if(email2 == null) 
			throw new PublicationIntrouvableException("Publications introuvables pour cet utilisateur");
		return email2;
	}
	
	
	/************************************************************************************/
	/*  			   			  ENVOIE DE MAIL AUTOMATIQUE         		         	*/
	/************************************************************************************/

	public void sendMailFromServerToUser(Users user, int i) throws MessagingException {
		
		Email email = new Email();
		email.setEmailDst(user.getEmail());
		email.setNom(user.getName());
		
		if(i==0) {
			email.setMessage("BIENVENU CHER NOUVEAU UTILISATEUR!!!\n NOUS VOUS SOUHAITONS "
					+ "UNE TRES BELLE EXPERIENCE SUR NOTRE PLATFORME INEDITE DE "
					+ "VENTE DE BIENS IMMOBILIERS");
		}
		else if(i==1) {
			email.setMessage("MERCI POUR VOTRE FIDELITE. \n NOUS VOUS INFORMONS JUSTE QUE "
							+ "NOUS AVONS PRIS EN COMPTE LES MODFICATIONS QUE VOUS VENEZ "
							+ "D'APPORTER SUR VOTRE COMPTE");
		}
		
		
		smtpMailSender.send(email.getEmailDst(),"no-reply", email.getMessage());
		
	}
	
	
	/************************************************************************************/
	/*  			   			  		 ENVOIE DE MAIL          		         	    */
	/************************************************************************************/
	
	public void sendMail(Email email) throws MessagingException {
		smtpMailSender.send(email.getEmailDst(),"MESSAGE ENVOYE PAR "+email.getNom(), email.getMessage());
	}
	
}
